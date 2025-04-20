const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all packages
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM packages');
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        next(error);
    }
});

// Get package by ID
router.get('/:id', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM packages WHERE package_id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Package not found'
            });
        }
        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        next(error);
    }
});

// Create new package
router.post('/', async (req, res, next) => {
    try {
        const { name, description, price, duration, location } = req.body;
        const [result] = await db.query(
            'INSERT INTO packages (name, description, price, duration, location) VALUES (?, ?, ?, ?, ?)',
            [name, description, price, duration, location]
        );
        res.status(201).json({
            success: true,
            message: 'Package created successfully',
            data: { package_id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
});

// Update package
router.put('/:id', async (req, res, next) => {
    try {
        const { name, description, price, duration, location } = req.body;
        const [result] = await db.query(
            'UPDATE packages SET name = ?, description = ?, price = ?, duration = ?, location = ? WHERE package_id = ?',
            [name, description, price, duration, location, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Package not found'
            });
        }
        res.json({
            success: true,
            message: 'Package updated successfully'
        });
    } catch (error) {
        next(error);
    }
});

// Delete package
router.delete('/:id', async (req, res, next) => {
    try {
        const [result] = await db.query('DELETE FROM packages WHERE package_id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Package not found'
            });
        }
        res.json({
            success: true,
            message: 'Package deleted successfully'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router; 