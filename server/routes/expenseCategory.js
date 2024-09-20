const express = require('express');
const router = express.Router();
const ExpenseCategory = require('../models/ExpenseCategory');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

// CREATE a new expense category
router.post(
    '/',
    authMiddleware,
    [
        body('categoryName').trim().isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters'),
        body('description').optional().isLength({ max: 255 }).withMessage('Description cannot exceed 255 characters')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { categoryName, description } = req.body;

        try {
            const newCategory = new ExpenseCategory({
                userId: req.user.id,
                categoryName,
                description
            });

            await newCategory.save();
            res.status(201).json({ message: 'Expense category created successfully', category: newCategory });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
);

// READ all expense categories for a user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const categories = await ExpenseCategory.find({ userId: req.user.id });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// READ a single expense category by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const category = await ExpenseCategory.findOne({ categoryId: req.params.id, userId: req.user.id });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// UPDATE an expense category
router.put(
    '/:id',
    authMiddleware,
    [
        body('categoryName').optional().trim().isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters'),
        body('description').optional().isLength({ max: 255 }).withMessage('Description cannot exceed 255 characters')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        //console.log(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //console.log('Cat Id: ', req.params.id, ' userid: ', req.user.id);

        const { categoryName, description } = req.body;
        
        try {
            
            let category = await ExpenseCategory.findOne({ categoryId: req.params.id, userId: req.user.id });
          // console.log('category: ', category);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            category.categoryName = categoryName || category.categoryName;
            category.description = description || category.description;
            category.updatedAt = Date.now();

            await category.save();
            res.status(200).json({ message: 'Category updated successfully', category });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
);

// DELETE an expense category
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const category = await ExpenseCategory.findOneAndDelete({ categoryId: req.params.id, userId: req.user.id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
