const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all reviews for a package
router.get('/package/:packageId', async (req, res, next) => {
    try {
        const [rows] = await db.query(`
            SELECT r.*, u.username 
            FROM reviews r
            JOIN users u ON r.user_id = u.user_id
            WHERE r.package_id = ?
            ORDER BY r.created_at DESC
        `, [req.params.packageId]);
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        next(error);
    }
});

// Create new review
router.post('/', async (req, res, next) => {
    try {
        const { user_id, package_id, rating, comment } = req.body;
        
        // Check if user has booked this package
        const [bookings] = await db.query(
            'SELECT * FROM bookings WHERE user_id = ? AND package_id = ? AND status = "completed"',
            [user_id, package_id]
        );
        
        if (bookings.length === 0) {
            return res.status(403).json({
                success: false,
                message: 'You can only review packages you have booked and completed'
            });
        }
        
        // Check if user has already reviewed this package
        const [existingReview] = await db.query(
            'SELECT * FROM reviews WHERE user_id = ? AND package_id = ?',
            [user_id, package_id]
        );
        
        if (existingReview.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this package'
            });
        }
        
        const [result] = await db.query(
            'INSERT INTO reviews (user_id, package_id, rating, comment) VALUES (?, ?, ?, ?)',
            [user_id, package_id, rating, comment]
        );
        
        // Update package average rating
        await db.query(`
            UPDATE packages p
            SET average_rating = (
                SELECT AVG(rating)
                FROM reviews
                WHERE package_id = ?
            )
            WHERE package_id = ?
        `, [package_id, package_id]);
        
        res.status(201).json({
            success: true,
            message: 'Review submitted successfully',
            data: { review_id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
});

// Update review
router.put('/:id', async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const [result] = await db.query(
            'UPDATE reviews SET rating = ?, comment = ? WHERE review_id = ?',
            [rating, comment, req.params.id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }
        
        // Update package average rating
        const [review] = await db.query('SELECT package_id FROM reviews WHERE review_id = ?', [req.params.id]);
        await db.query(`
            UPDATE packages p
            SET average_rating = (
                SELECT AVG(rating)
                FROM reviews
                WHERE package_id = ?
            )
            WHERE package_id = ?
        `, [review[0].package_id, review[0].package_id]);
        
        res.json({
            success: true,
            message: 'Review updated successfully'
        });
    } catch (error) {
        next(error);
    }
});

// Delete review
router.delete('/:id', async (req, res, next) => {
    try {
        // Get package_id before deleting the review
        const [review] = await db.query('SELECT package_id FROM reviews WHERE review_id = ?', [req.params.id]);
        
        const [result] = await db.query('DELETE FROM reviews WHERE review_id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }
        
        // Update package average rating
        if (review.length > 0) {
            await db.query(`
                UPDATE packages p
                SET average_rating = (
                    SELECT AVG(rating)
                    FROM reviews
                    WHERE package_id = ?
                )
                WHERE package_id = ?
            `, [review[0].package_id, review[0].package_id]);
        }
        
        res.json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router; 