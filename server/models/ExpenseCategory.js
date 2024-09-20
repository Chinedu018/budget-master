const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ExpenseCategorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        required: [true, 'Category name is required'],
        minlength: [3, 'Category name must be at least 3 characters long'],
        maxlength: [100, 'Category name cannot exceed 100 characters']
    },
    description: {
        type: String,
        maxlength: [255, 'Description cannot exceed 255 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

ExpenseCategorySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('ExpenseCategory', ExpenseCategorySchema);
