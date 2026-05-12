const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Registration = require("./models/Registration");
const fs = require('fs');
const path = require('path');
const Ticket = require("./models/Ticket");
const Review = require("./models/Review");
const authRoutes = require("./routes/authRoutes");

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
app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);

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
=======
const startServer = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI || "mongodb://localhost:27017/zoo-app",
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            }
        );

        console.log("MongoDB verbunden!");

        app.listen(PORT, () =>
            console.log(`Server laeuft auf http://localhost:${PORT}`)
        );
    } catch (err) {
        console.error("MongoDB Verbindungsfehler:", err.message);
        process.exit(1);
    }
};

app.get("/", (req, res) => {
    res.json({
        message:
            "Backend-Server laeuft! API-Endpunkte: POST /registration, POST /login, GET/POST /reviews, POST /tickets",
        database: "MongoDB",
    });
});

app.get("/reviews", async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        console.error("Fehler beim Laden der Bewertungen:", error);
        res.status(500).json({
            message: "Server-Fehler beim Laden der Bewertungen",
            error: error.message,
        });
    }
});

app.post("/reviews", async (req, res) => {
    const { name, visitType, rating, message, username } = req.body;

    if (!name || !visitType || !rating || !message) {
        return res.status(400).json({
            message: "Bitte alle Felder fuer die Bewertung ausfuellen!",
        });
    }

    const numericRating = Number(rating);

    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
        return res.status(400).json({
            message: "Die Bewertung muss zwischen 1 und 5 liegen!",
        });
    }

    try {
        const review = new Review({
            name,
            visitType,
            rating: numericRating,
            message,
            username: username || null,
        });

        await review.save();

        res.status(201).json({
            message: "Bewertung erfolgreich gespeichert!",
            review,
        });
    } catch (error) {
        console.error("Fehler beim Speichern der Bewertung:", error);
        res.status(500).json({
            message: "Server-Fehler beim Speichern der Bewertung",
            error: error.message,
        });
    }
});

app.post("/tickets", async (req, res) => {
    const { visitDate, adults, children, family, fullName, username } = req.body;

    if (!visitDate || !fullName) {
        return res.status(400).json({
            message: "Besuchsdatum und vollstaendiger Name sind erforderlich!",
        });
    }

    const numericAdults = Number(adults) || 0;
    const numericChildren = Number(children) || 0;
    const numericFamily = Number(family) || 0;

    if (numericAdults < 0 || numericChildren < 0 || numericFamily < 0) {
        return res.status(400).json({
            message: "Ticketanzahlen duerfen nicht negativ sein!",
        });
    }

    const totalTickets = numericAdults + numericChildren + numericFamily;

    if (totalTickets <= 0) {
        return res.status(400).json({
            message: "Mindestens ein Ticket muss bestellt werden!",
        });
    }

    const totalPrice = numericAdults * 15 + numericChildren * 10 + numericFamily * 42;

    try {
        const ticket = new Ticket({
            visitDate,
            adults: numericAdults,
            children: numericChildren,
            family: numericFamily,
            fullName,
            totalTickets,
            totalPrice,
            username: username || null,
        });

        await ticket.save();

        res.status(201).json({
            message: "Ticketbestellung erfolgreich gespeichert!",
            ticket,
        });
    } catch (error) {
        console.error("Fehler beim Speichern der Ticketbestellung:", error);
        res.status(500).json({
            message: "Server-Fehler beim Speichern der Ticketbestellung",
            error: error.message,
        });
    }
});

startServer();
