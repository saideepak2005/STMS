<?php
require_once 'config.php';

// Add passenger details
function addPassengerDetails($bookingId, $passengers) {
    global $pdo;
    
    try {
        $pdo->beginTransaction();

        foreach ($passengers as $passenger) {
            $stmt = $pdo->prepare("
                INSERT INTO passenger_details 
                (booking_id, name, age, gender, id_proof_type, id_proof_number) 
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $bookingId,
                $passenger['name'],
                $passenger['age'],
                $passenger['gender'],
                $passenger['id_proof_type'],
                $passenger['id_proof_number']
            ]);
        }

        $pdo->commit();
        return true;
    } catch(PDOException $e) {
        $pdo->rollBack();
        return false;
    }
}

// Get passenger details for a booking
function getPassengerDetails($bookingId) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT * FROM passenger_details 
            WHERE booking_id = ?
            ORDER BY passenger_id
        ");
        $stmt->execute([$bookingId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        return [];
    }
}

// Update passenger details
function updatePassengerDetails($passengerId, $details) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            UPDATE passenger_details 
            SET name = ?, age = ?, gender = ?, id_proof_type = ?, id_proof_number = ?
            WHERE passenger_id = ?
        ");
        return $stmt->execute([
            $details['name'],
            $details['age'],
            $details['gender'],
            $details['id_proof_type'],
            $details['id_proof_number'],
            $passengerId
        ]);
    } catch(PDOException $e) {
        return false;
    }
}

// Delete passenger details
function deletePassengerDetails($passengerId) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("DELETE FROM passenger_details WHERE passenger_id = ?");
        return $stmt->execute([$passengerId]);
    } catch(PDOException $e) {
        return false;
    }
}
?> 