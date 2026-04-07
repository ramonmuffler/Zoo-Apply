const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Verbindung
mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/zoo-app", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("✓ MongoDB verbunden!");
    })
    .catch((err) => {
        console.error("✗ MongoDB Verbindungsfehler:", err.message);
        process.exit(1);
    });

// Test-Route um zu prüfen ob Server läuft
app.get("/", (req, res) => {
    res.json({
        message:
            "Backend-Server läuft! API-Endpunkte: POST /registration, POST /login",
        database: "MongoDB",
    });
});

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