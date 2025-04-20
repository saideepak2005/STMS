const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register new user
router.post('/register', async (req, res, next) => {
    try {
        const { firstname, lastname, email, username, password } = req.body;
        
        // Check if user already exists
        const [existingUsers] = await db.query(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email]
        );
        
        if (existingUsers.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Username or email already exists'
            });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Insert user into database
        const [result] = await db.query(
            'INSERT INTO users (firstname, lastname, email, username, password) VALUES (?, ?, ?, ?, ?)',
            [firstname, lastname, email, username, hashedPassword]
        );
        
        // Create JWT token
        const token = jwt.sign(
            { user_id: result.insertId, username }, 
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '24h' }
        );
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                user_id: result.insertId,
                username,
                firstname,
                lastname,
                email
            }
        });
    } catch (error) {
        next(error);
    }
});

// Login user
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        // Find user by username or email
        const [users] = await db.query(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, username]
        );
        
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        const user = users[0];
        
        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        // Create JWT token
        const token = jwt.sign(
            { user_id: user.user_id, username: user.username },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '24h' }
        );
        
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                user_id: user.user_id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
});

// Get current user
router.get('/me', authenticateToken, async (req, res, next) => {
    try {
        const [users] = await db.query(
            'SELECT user_id, username, firstname, lastname, email FROM users WHERE user_id = ?',
            [req.user.user_id]
        );
        
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.json({
            success: true,
            data: users[0]
        });
    } catch (error) {
        next(error);
    }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication token required'
        });
    }
    
    jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
        
        req.user = user;
        next();
    });
}

// Export the authenticate middleware so it can be used in other routes
router.authenticateToken = authenticateToken;

module.exports = router;