const express = require('express');
const router = express.Router();
const EducationalResource = require('../models/EducationalResource');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

// CREATE a new educational resource (Admin only)
router.post(
    '/educational-resource',
    authMiddleware,
    [
        body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
        body('content').notEmpty().withMessage('Content is required'),
        body('author').notEmpty().withMessage('Author is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content, author } = req.body;

        try {
            const newResource = new EducationalResource({
                title,
                content,
                author: req.user.id || author // Assuming req.user contains the authenticated user
            });

            await newResource.save();
            res.status(201).json({ message: 'Educational resource created successfully', resource: newResource });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
);

// READ all educational resources (Standard and Admin users)
router.get('/educational-resource', authMiddleware, async (req, res) => {
    try {
        const resources = await EducationalResource.find();
        res.status(200).json(resources);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// READ a single educational resource by ID (Standard and Admin users)
router.get('/educational-resource/:id', authMiddleware, async (req, res) => {
    try {
        const resource = await EducationalResource.findOne({ resourceId: req.params.id });

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.status(200).json(resource);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// UPDATE an educational resource (Admin only)
router.put(
    '/educational-resource/:id',
    authMiddleware,
    [
        body('title').optional().trim().isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
        body('content').optional().notEmpty().withMessage('Content cannot be empty')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content } = req.body;

        try {
            let resource = await EducationalResource.findOne({ resourceId: req.params.id });

            if (!resource) {
                return res.status(404).json({ message: 'Resource not found' });
            }

            if (title) resource.title = title;
            if (content) resource.content = content;
            resource.updatedAt = Date.now();

            await resource.save();
            res.status(200).json({ message: 'Resource updated successfully', resource });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
);

// DELETE an educational resource (Admin only)
router.delete('/educational-resource/:id', authMiddleware, async (req, res) => {
    try {
        const resource = await EducationalResource.findOneAndDelete({ resourceId: req.params.id });

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
