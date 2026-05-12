const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    attractionId: { type: String, required: true },
    attractionTitle: { type: String, required: true },
    personName: { type: String, required: true },
    email: { type: String, required: true },
    personCount: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;

