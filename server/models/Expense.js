// models/Expense.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid'); // For generating UUIDs

const expenseSchema = new Schema({
    expenseId: { type: String, default: uuidv4, unique: true },
    userId: { type: String, required: true, ref: 'User' },
    amount: { type: Number, required: true },
    categoryId: { type: String, required: true, ref: 'ExpenseCategory' },
    date: { type: Date, required: true },
    description: { type: String, maxlength: 255 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

expenseSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});
module.exports = mongoose.model('Expense', expenseSchema);
