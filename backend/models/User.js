const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /.+@.+\..+/,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    { timestamps: true }
);

// Hash-Passwort vor dem Speichern
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Methode zum Passwort vergleichen
userSchema.methods.comparePassword = async function (passwordToCheck) {
    return await bcryptjs.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
