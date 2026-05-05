const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
        visitDate: {
            type: String,
            required: true,
            trim: true,
        },
        adults: {
            type: Number,
            required: true,
            min: 0,
        },
        children: {
            type: Number,
            required: true,
            min: 0,
        },
        family: {
            type: Number,
            required: true,
            min: 0,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        totalTickets: {
            type: Number,
            required: true,
            min: 1,
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        username: {
            type: String,
            trim: true,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
