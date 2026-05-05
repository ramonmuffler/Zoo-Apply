const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const Ticket = require("./models/Ticket");
const Review = require("./models/Review");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);

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
