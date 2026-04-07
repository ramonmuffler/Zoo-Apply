const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = path.join(__dirname, "users.json");

// Stelle sicher, dass die Datei existiert
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// Test-Route um zu prüfen ob Server läuft
app.get("/", (req, res) => {
    res.json({ message: "Backend-Server läuft! API-Endpunkte: POST /registration, POST /login" });
});

// Registrierung
app.post("/registration", (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Alle Felder müssen ausgefüllt werden!" });
    }

    const users = JSON.parse(fs.readFileSync(USERS_FILE));

    // Prüfe, ob Benutzername oder Email schon existiert
    const userExists = users.find(
        (user) => user.username === username || user.email === email
    );
    if (userExists) {
        return res.status(400).json({ message: "Benutzername oder E-Mail existiert bereits!" });
    }

    // Benutzer speichern
    users.push({ username, email, password });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    res.json({ message: "Registrierung erfolgreich!" });
});

// Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Benutzername und Passwort sind erforderlich!" });
    }

    const users = JSON.parse(fs.readFileSync(USERS_FILE));

    // Prüfe, ob Benutzer existiert und Passwort korrekt ist
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Benutzername oder Passwort ist falsch!" });
    }

    res.json({ message: "Anmeldung erfolgreich!", username: user.username });
});

app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));