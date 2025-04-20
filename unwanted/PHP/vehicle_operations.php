<?php
require_once 'config.php';

// Get all vehicles
function getAllVehicles() {
    global $pdo;
    
    try {
        $stmt = $pdo->query("SELECT * FROM vehicles ORDER BY name");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        return [];
    }
}

// Get vehicle by ID
function getVehicleById($vehicleId) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM vehicles WHERE vehicle_id = ?");
        $stmt->execute([$vehicleId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        return null;
    }
}

// Update booking vehicle
function updateBookingVehicle($bookingId, $userId, $vehicleId) {
    global $pdo;
    
    try {
        // Get vehicle price
        $vehicle = getVehicleById($vehicleId);
        if (!$vehicle) {
            return false;
        }

        // Update booking
        $stmt = $pdo->prepare("
            UPDATE bookings b
            JOIN packages p ON b.package_id = p.package_id
            SET b.vehicle_id = ?, b.total_price = p.price + ?
            WHERE b.booking_id = ? AND b.user_id = ? AND b.status = 'pending'
        ");
        return $stmt->execute([$vehicleId, $vehicle['price'], $bookingId, $userId]);
    } catch(PDOException $e) {
        return false;
    }
}

// Get vehicle price
function getVehiclePrice($vehicleId) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("SELECT price FROM vehicles WHERE vehicle_id = ?");
        $stmt->execute([$vehicleId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? $result['price'] : 0;
    } catch(PDOException $e) {
        return 0;
    }
}
?> 