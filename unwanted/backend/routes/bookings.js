const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all bookings
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query(`
            SELECT b.*, p.name as package_name, u.username 
            FROM bookings b
            JOIN packages p ON b.package_id = p.package_id
            JOIN users u ON b.user_id = u.user_id
        `);
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        next(error);
    }
});

// Get user's bookings
router.get('/user/:userId', async (req, res, next) => {
    try {
        const [rows] = await db.query(`
            SELECT b.*, p.name as package_name
            FROM bookings b
            JOIN packages p ON b.package_id = p.package_id
            WHERE b.user_id = ?
        `, [req.params.userId]);
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        next(error);
    }
});

// Create new booking
router.post('/', async (req, res, next) => {
    try {
        const { user_id, package_id, booking_date, number_of_people, total_price } = req.body;
        
        // Start transaction
        await db.beginTransaction();
        
        // Create booking
        const [result] = await db.query(
            'INSERT INTO bookings (user_id, package_id, booking_date, number_of_people, total_price, status) VALUES (?, ?, ?, ?, ?, "pending")',
            [user_id, package_id, booking_date, number_of_people, total_price]
        );
        
        // Check package availability (you might want to add more complex logic here)
        const [packageCheck] = await db.query(
            'SELECT * FROM packages WHERE package_id = ?',
            [package_id]
        );
        
        if (packageCheck.length === 0) {
            await db.rollback();
            return res.status(404).json({
                success: false,
                message: 'Package not found'
            });
        }
        
        // Commit transaction
        await db.commit();
        
        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: { booking_id: result.insertId }
        });
    } catch (error) {
        await db.rollback();
        next(error);
    }
});

// Update booking status
router.put('/:id/status', async (req, res, next) => {
    try {
        const { status } = req.body;
        const [result] = await db.query(
            'UPDATE bookings SET status = ? WHERE booking_id = ?',
            [status, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        res.json({
            success: true,
            message: 'Booking status updated successfully'
        });
    } catch (error) {
        next(error);
    }
});

// Cancel booking
router.delete('/:id', async (req, res, next) => {
    try {
        const [result] = await db.query(
            'UPDATE bookings SET status = "cancelled" WHERE booking_id = ?',
            [req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        res.json({
            success: true,
            message: 'Booking cancelled successfully'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router; 