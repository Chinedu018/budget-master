const express = require('express');
const router = express.Router();
const Income = require('../models/Income');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { check, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

// Route 1: Get all incomes for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const incomes = await Income.find({ userId });
        res.status(200).json(incomes);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get income by ID
router.get('/:incomeId', authMiddleware, async (req, res) => {
    try {
        const { incomeId } = req.params;
        const income = await Income.findById(incomeId);

        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.json(income);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route 2: Get all incomes for a specific user or all incomes (Admin only)
router.get('/admin', [authMiddleware, adminMiddleware], async (req, res) => {
    try {
        const { userId } = req.query;
        const incomes = userId ? await Income.find({ userId }) : await Income.find();
        res.status(200).json(incomes);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Add new income
router.post('/', [
    authMiddleware,
    check('amount', 'Amount is required and must be a positive number').isFloat({ gt: 0 }),
    check('source', 'Source is required').notEmpty(),
    check('date', 'Date is required').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { amount, source, date, description } = req.body;

    try {
        const incomeId = uuidv4();
        const income = new Income({
            incomeId,
            userId: req.user.id,
            amount,
            source,
            date,
            description
        });

        await income.save();
        res.status(201).json(income);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete income
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    console.log(req)
    try {
        const income = await Income.findByIdAndDelete(req.params.id);
        if (!income) {
            return res.status(404).json({ message: 'Income record not found' });
        }
        res.json({ message: 'Income record deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Edit an existing income
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { incomeId } = req.params.id;
        const { amount, source, date, description } = req.body;

        let income = await Income.findById(incomeId);

        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        // Update income fields
        income.amount = amount;
        income.source = source;
        income.date = date;
        income.description = description;

        await income.save();

        res.json({ message: 'Income updated successfully', income });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;