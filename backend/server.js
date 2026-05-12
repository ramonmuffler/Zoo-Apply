const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Registration = require("./models/Registration");
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS explizit konfigurieren (erlaubt Dev-Frontend auf 5173)
const corsOptions = {
    origin: [ 'http://localhost:5173', 'http://127.0.0.1:5173' ],
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

let dbConnected = false;

// Middleware
app.use(bodyParser.json());

// MongoDB Verbindung
mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/zoo-app", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        dbConnected = true;
        console.log("✓ MongoDB verbunden!");
    })
    .catch((err) => {
        dbConnected = false;
        console.error("✗ MongoDB Verbindungsfehler:", err.message);
        console.error('WARN: Server läuft im Fallback-Modus (dateibasiertes Storage)');
        // don't exit — continue running with file fallback
    });

const REG_FILE = path.join(__dirname, 'registrations.json');
function readRegsFromFile() {
    try {
        if (!fs.existsSync(REG_FILE)) {
            fs.writeFileSync(REG_FILE, JSON.stringify([]));
            return [];
        }
        const raw = fs.readFileSync(REG_FILE, 'utf8');
        return JSON.parse(raw || '[]');
    } catch (err) {
        console.error('Fehler beim Lesen der registrations.json:', err);
        return [];
    }
}
function writeRegsToFile(arr) {
    try {
        fs.writeFileSync(REG_FILE, JSON.stringify(arr, null, 2));
    } catch (err) {
        console.error('Fehler beim Schreiben der registrations.json:', err);
    }
}

// Test-Route um zu prüfen ob Server läuft
app.get("/", (req, res) => {
    res.json({
        message:
            "Backend-Server läuft! API-Endpunkte: POST /registration, POST /login, GET /attraction-registrations, POST /register-attraction",
        database: dbConnected ? "MongoDB" : "file-fallback",
    });
});

// Neue Route: Alle Attraction-Registrations (nur heute)
app.get('/attraction-registrations', async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0,0,0,0);
        if (dbConnected) {
            const regs = await Registration.find({ createdAt: { $gte: startOfDay } }).sort({ createdAt: -1 });
            return res.json(regs);
        }
        // file fallback
        const regs = readRegsFromFile();
        const today = regs.filter(r => new Date(r.createdAt) >= startOfDay);
        return res.json(today.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
        console.error('Fehler beim Laden der Registrations:', error);
        res.status(500).json({ message: 'Server-Fehler beim Laden der Registrations' });
    }
});

// Neue Route: Registrierung für eine Attraction
app.post('/register-attraction', async (req, res) => {
    const { attractionId, attractionTitle, personName, email, personCount } = req.body;

    if (!attractionId || !attractionTitle || !personName || !email || !personCount) {
        return res.status(400).json({ message: 'Alle Felder sind erforderlich.' });
    }

    try {
        const startOfDay = new Date();
        startOfDay.setHours(0,0,0,0);

        let totalToday = 0;
        if (dbConnected) {
            const todaysRegs = await Registration.find({ attractionId, createdAt: { $gte: startOfDay } });
            totalToday = todaysRegs.reduce((sum, r) => sum + r.personCount, 0);
        } else {
            const regs = readRegsFromFile();
            const todays = regs.filter(r => r.attractionId === attractionId && new Date(r.createdAt) >= startOfDay);
            totalToday = todays.reduce((sum, r) => sum + r.personCount, 0);
        }

        const maxCapacity = req.body.maxCapacity ?? 100;

        if (totalToday + Number(personCount) > Number(maxCapacity)) {
            return res.status(400).json({ message: `Nicht genügend freie Plätze. Verfügbar: ${Math.max(0, maxCapacity - totalToday)}` });
        }

        if (dbConnected) {
            const newReg = new Registration({ attractionId, attractionTitle, personName, email, personCount });
            await newReg.save();
        } else {
            const regs = readRegsFromFile();
            regs.push({ attractionId, attractionTitle, personName, email, personCount, createdAt: new Date().toISOString() });
            writeRegsToFile(regs);
        }

        res.json({ message: 'Erfolgreich registriert.' });
    } catch (error) {
        console.error('Fehler bei Registrierung:', error);
        res.status(500).json({ message: 'Server-Fehler bei der Registrierung' });
    }
});

// Tägliche Reset-Funktion: Löscht alle Registrations um Mitternacht (Server-Zeit)
function scheduleDailyReset() {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24,0,0,0);
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    setTimeout(async () => {
        try {
            if (dbConnected) {
                await Registration.deleteMany({});
            } else {
                writeRegsToFile([]);
            }
            console.log('Tägliches Reset: Alle Registrations gelöscht.');
        } catch (err) {
            console.error('Fehler beim täglichen Reset:', err);
        }
        // Schedule next reset in 24h
        setInterval(async () => {
            try {
                if (dbConnected) {
                    await Registration.deleteMany({});
                } else {
                    writeRegsToFile([]);
                }
                console.log('Tägliches Reset: Alle Registrations gelöscht.');
            } catch (err) {
                console.error('Fehler beim täglichen Reset (Interval):', err);
            }
        }, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
}

scheduleDailyReset();

// Registrierung
app.post("/registration", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ message: "Alle Felder müssen ausgefüllt werden!" });
    }

    try {
        // Prüfe, ob Benutzername oder Email schon existiert
        const userExists = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (userExists) {
            return res.status(400).json({
                message: "Benutzername oder E-Mail existiert bereits!",
            });
        }

        // Neuen Benutzer erstellen (Passwort wird automatisch gehashed)
        const newUser = new User({
            username,
            email,
            password,
        });

        await newUser.save();

        res.json({ message: "Registrierung erfolgreich!" });
    } catch (error) {
        console.error("Registrierungsfehler:", error);
        res.status(500).json({
            message: "Server-Fehler bei der Registrierung",
            error: error.message,
        });
    }
});

// Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Benutzername und Passwort sind erforderlich!",
        });
    }

    try {
        // Benutzer in der Datenbank suchen
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                message: "Benutzername oder Passwort ist falsch!",
            });
        }

        // Passwort vergleichen
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Benutzername oder Passwort ist falsch!",
            });
        }

        res.json({
            message: "Anmeldung erfolgreich!",
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        console.error("Login-Fehler:", error);
        res.status(500).json({
            message: "Server-Fehler beim Login",
            error: error.message,
        });
    }
});

app.listen(PORT, () =>
    console.log(`Server läuft auf http://localhost:${PORT}`)
);