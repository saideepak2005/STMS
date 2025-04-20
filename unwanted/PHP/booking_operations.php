<?php
require_once 'config.php';

// Confirm booking
function confirmBooking($bookingId, $userId) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            UPDATE bookings 
            SET status = 'confirmed' 
            WHERE booking_id = ? AND user_id = ? AND status = 'pending'
        ");
        return $stmt->execute([$bookingId, $userId]);
    } catch(PDOException $e) {
        return false;
    }
}

// Cancel booking
function cancelBooking($bookingId, $userId) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            UPDATE bookings 
            SET status = 'cancelled' 
            WHERE booking_id = ? AND user_id = ?
        ");
        return $stmt->execute([$bookingId, $userId]);
    } catch(PDOException $e) {
        return false;
    }
}

// Get booking details
function getBookingDetails($bookingId, $userId) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT b.*, p.name as package_name, p.price as package_price,
                   v.name as vehicle_name, v.price as vehicle_price
            FROM bookings b
            JOIN packages p ON b.package_id = p.package_id
            LEFT JOIN vehicles v ON b.vehicle_id = v.vehicle_id
            WHERE b.booking_id = ? AND b.user_id = ?
        ");
        $stmt->execute([$bookingId, $userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        return null;
    }
}

// Get user bookings
function getUserBookings($userId) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT b.*, p.name as package_name, p.price as package_price,
                   v.name as vehicle_name, v.price as vehicle_price
            FROM bookings b
            JOIN packages p ON b.package_id = p.package_id
            LEFT JOIN vehicles v ON b.vehicle_id = v.vehicle_id
            WHERE b.user_id = ?
            ORDER BY b.booking_date DESC
        ");
        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        return [];
    }
}

// Process payment
function processPayment($bookingId, $userId, $paymentDetails) {
    global $pdo;
    
    try {
        $pdo->beginTransaction();

        // Get booking details
        $booking = getBookingDetails($bookingId, $userId);
        if (!$booking || $booking['status'] !== 'pending') {
            throw new Exception('Invalid booking');
        }

        // Here you would integrate with a payment gateway
        // For now, we'll just simulate a successful payment
        $paymentStatus = true;

        if ($paymentStatus) {
            // Update booking status
            $stmt = $pdo->prepare("
                UPDATE bookings 
                SET status = 'confirmed' 
                WHERE booking_id = ? AND user_id = ?
            ");
            $stmt->execute([$bookingId, $userId]);

            $pdo->commit();
            return true;
        }

        $pdo->rollBack();
        return false;
    } catch(Exception $e) {
        $pdo->rollBack();
        return false;
    }
}
?> 