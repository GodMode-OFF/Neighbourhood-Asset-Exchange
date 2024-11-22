const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  availableUntil: { type: Date, required: true },
  isBorrowed: { type: Boolean, default: false }, // Add this field to track borrowing status
});

module.exports = mongoose.model('Item', itemSchema);
