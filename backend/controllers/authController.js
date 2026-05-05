const User = require("../models/User");

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ message: "Alle Felder muessen ausgefuellt werden!" });
    }

    try {
        const userExists = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (userExists) {
            return res.status(400).json({
                message: "Benutzername oder E-Mail existiert bereits!",
            });
        }

        const newUser = new User({
            username,
            email,
            password,
        });

        await newUser.save();

        res.json({ message: "Registrierung erfolgreich!" });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationMessages = Object.values(error.errors).map(
                (validationError) => validationError.message
            );

            return res.status(400).json({
                message: validationMessages.join(" "),
                error: error.message,
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                message: "Benutzername oder E-Mail existiert bereits!",
                error: error.message,
            });
        }

        console.error("Registrierungsfehler:", error);
        res.status(500).json({
            message: "Server-Fehler bei der Registrierung",
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Benutzername und Passwort sind erforderlich!",
        });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                message: "Benutzername oder Passwort ist falsch!",
            });
        }

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
};

module.exports = {
    register,
    login,
};
