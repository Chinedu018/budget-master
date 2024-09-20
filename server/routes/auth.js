const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// This will handle User Registration
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            role
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({message: err.message});

    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        // Generate JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role,
                name: user.name,
                email: user.email,
            }
        };

        

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

         // Set HTTP-only cookie
         res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true in production
            sameSite: 'Strict',
            maxAge: 3600000, // 1 hour
        });

        res.status(200).json({ message: 'Login Successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true in production
        sameSite: 'Strict',
    });

    res.status(200).json({ message: 'Logout successful' });
});

router.get('/check', (req, res) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.json({ isAuthenticated: false, role: 'guest' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.user);
        res.json({ isAuthenticated: true, user: decoded.user });

        //console.log("Is Authenticated: ", isAuthenticated);
    } catch (err) {
        res.json({ isAuthenticated: false, role: 'guest' });
    }
});

module.exports = router;

