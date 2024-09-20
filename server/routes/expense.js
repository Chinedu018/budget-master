// routes/expense.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Expense = require('../models/Expense');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

// CREATE a new expense
router.post(
    '/',
    authMiddleware,
    [
        body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than zero'),
        body('categoryId').isLength({ max: 255, min: 15 }).withMessage('Invalid category ID'),
        body('date').isISO8601().withMessage('Invalid date format'),
        body('description').optional().isLength({ max: 255 }).withMessage('Description cannot exceed 255 characters')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { amount, categoryId, date, description } = req.body;

        try {
            // Use req.user.id to set userId
            const newExpense = new Expense({
                amount,
                categoryId,
                date,
                description,
                userId: req.user.id  // Assign userId from the authenticated user
            });

            await newExpense.save();
            console.log(newExpense);
            res.status(201).json({ message: 'Expense created successfully', expense: newExpense });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
);


// READ all expenses for a user
// router.get('/', authMiddleware, async (req, res) => {
//     // try {
//         const expenses = await Expense.find({ userId: req.user.id })
//                                 .populate('categoryId', 'categoryName');
//         res.status(200).json(expenses);
//     // } catch (err) {,
//     //     console.log( err.message);
//     //     res.status(500).json({ message: 'Server error', error: err.message });
//     // }
// });

router.get('/', authMiddleware, async (req, res) => {
    try {
        const expenses = await Expense.aggregate([
            {
                $match: { userId: req.user.id }
            },
            {
                $lookup: {
                    from: 'expensecategories',  // Collection name in MongoDB (usually pluralized)
                    localField: 'categoryId',   // Field in Expense
                    foreignField: 'categoryId', // Field in ExpenseCategory
                    as: 'categoryDetails'
                }
            },
            {
                $unwind: '$categoryDetails'  // Flatten the array to get the category details
            },
            {
                $project: {
                    expenseId: 1,
                    userId: 1,
                    amount: 1,
                    date: 1,
                    description: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    categoryId:1,
                    categoryName: '$categoryDetails.categoryName'
                }
            }
        ]);

        res.status(200).json(expenses);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/:expenseId', authMiddleware, async (req, res) => {
    try {
        const expense = await Expense.aggregate([
            {
                $match: { expenseId: req.params.expenseId, userId: req.user.id }
            },
            {
                $lookup: {
                    from: 'expensecategories',
                    localField: 'categoryId',
                    foreignField: 'categoryId',
                    as: 'categoryDetails'
                }
            },
            {
                $unwind: '$categoryDetails'
            },
            {
                $project: {
                    expenseId: 1,
                    userId: 1,
                    amount: 1,
                    categoryId: 1,
                    date: 1,
                    description: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    categoryName: '$categoryDetails.categoryName'
                }
            }
        ]);

        if (!expense || expense.length === 0) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json(expense[0]);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/category/:categoryId', authMiddleware, async (req, res) => {
    try {
        const expenses = await Expense.aggregate([
            {
                $match: { categoryId: req.params.categoryId, userId: req.user.id }
            },
            {
                $lookup: {
                    from: 'expensecategories',
                    localField: 'categoryId',
                    foreignField: 'categoryId',
                    as: 'categoryDetails'
                }
            },
            {
                $unwind: '$categoryDetails'
            },
            {
                $project: {
                    expenseId: 1,
                    userId: 1,
                    amount: 1,
                    categoryId: 1,
                    date: 1,
                    description: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    categoryName: '$categoryDetails.categoryName'
                }
            }
        ]);

        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// READ a single expense by expenseId
// router.get('/:expenseId', authMiddleware, async (req, res) => {
//     try {
//         const expense = await Expense.findOne({ expenseId: req.params.expenseId, userId: req.user.id })
//                         ; //.populate('categoryId', 'categoryName');
//         if (!expense) {
//             return res.status(404).json({ message: 'Expense not found' });
//         }

//         res.status(200).json(expense);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// });

// UPDATE an expense
router.put(
    '/:expenseId',
    authMiddleware,
    [
        body('amount').optional().isFloat({ gt: 0 }).withMessage('Amount must be greater than zero'),
        body('categoryId').optional().isLength({min:10}).withMessage('Invalid category ID'),
        body('date').optional().isISO8601().withMessage('Invalid date format'),
        body('description').optional().isLength({ max: 255 }).withMessage('Description cannot exceed 255 characters')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { amount, categoryId, date, description } = req.body;

        try {
            let expense = await Expense.findOne({ expenseId: req.params.expenseId, userId: req.user.id });
            if (!expense) {
                return res.status(404).json({ message: 'Expense not found' });
            }

            expense.amount = amount || expense.amount;
            expense.categoryId = categoryId || expense.categoryId;
            //expense.date = date || expense.date;
            expense.updatedAt = Date.now();

            await expense.save();
            res.status(200).json({ message: 'Expense updated successfully', expense });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
);

// DELETE an expense
router.delete('/:expenseId', authMiddleware, async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({ expenseId: req.params.expenseId, userId: req.user.id });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
