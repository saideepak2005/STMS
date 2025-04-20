<?php
require_once 'config.php';

// Add to cart
function addToCart($userId, $packageId, $vehicleId = null) {
    global $pdo;
    
    try {
        // Get package details
        $stmt = $pdo->prepare("SELECT * FROM packages WHERE package_id = ?");
        $stmt->execute([$packageId]);
        $package = $stmt->fetch(PDO::FETCH_ASSOC);

        // Get vehicle price if selected
        $vehiclePrice = 0;
        if ($vehicleId) {
            $stmt = $pdo->prepare("SELECT price FROM vehicles WHERE vehicle_id = ?");
            $stmt->execute([$vehicleId]);
            $vehicle = $stmt->fetch(PDO::FETCH_ASSOC);
            $vehiclePrice = $vehicle['price'];
        }

        // Calculate total price
        $totalPrice = $package['price'] + $vehiclePrice;

        // Insert into bookings
        $stmt = $pdo->prepare("INSERT INTO bookings (user_id, package_id, vehicle_id, total_price) VALUES (?, ?, ?, ?)");
        $stmt->execute([$userId, $packageId, $vehicleId, $totalPrice]);

        return $pdo->lastInsertId();
    } catch(PDOException $e) {
        return false;
    }
}

// Get cart items
function getCartItems($userId) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT b.*, p.name as package_name, p.price as package_price, 
                   v.name as vehicle_name, v.price as vehicle_price
            FROM bookings b
            JOIN packages p ON b.package_id = p.package_id
            LEFT JOIN vehicles v ON b.vehicle_id = v.vehicle_id
            WHERE b.user_id = ? AND b.status = 'pending'
        ");
        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        return [];
    }
}

// Remove from cart
function removeFromCart($bookingId, $userId) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("DELETE FROM bookings WHERE booking_id = ? AND user_id = ? AND status = 'pending'");
        return $stmt->execute([$bookingId, $userId]);
    } catch(PDOException $e) {
        return false;
    }
}

// Update cart item
function updateCartItem($bookingId, $userId, $vehicleId) {
    global $pdo;
    
    try {
        // Get vehicle price
        $stmt = $pdo->prepare("SELECT price FROM vehicles WHERE vehicle_id = ?");
        $stmt->execute([$vehicleId]);
        $vehicle = $stmt->fetch(PDO::FETCH_ASSOC);

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
?> 