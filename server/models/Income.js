const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    incomeId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    source: { type: String, required: true, maxlength: 100 },
    date: { type: Date, required: true },
    description: { type: String, maxlength: 255 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Income', incomeSchema);
