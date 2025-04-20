<?php
require_once 'config.php';

// Get all packages
function getAllPackages() {
    global $pdo;
    
    try {
        $stmt = $pdo->query("
            SELECT p.*, pd.food_included, pd.accommodation_type, pd.transport_included
            FROM packages p
            LEFT JOIN package_details pd ON p.package_id = pd.package_id
            ORDER BY p.name
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        return [];
    }
}

// Get package by ID
function getPackageById($packageId) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT p.*, pd.food_included, pd.accommodation_type, pd.transport_included
            FROM packages p
            LEFT JOIN package_details pd ON p.package_id = pd.package_id
            WHERE p.package_id = ?
        ");
        $stmt->execute([$packageId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        return null;
    }
}

// Get packages by type
function getPackagesByType($type) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT p.*, pd.food_included, pd.accommodation_type, pd.transport_included
            FROM packages p
            LEFT JOIN package_details pd ON p.package_id = pd.package_id
            WHERE p.type = ?
            ORDER BY p.name
        ");
        $stmt->execute([$type]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        return [];
    }
}

// Get package price
function getPackagePrice($packageId) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("SELECT price FROM packages WHERE package_id = ?");
        $stmt->execute([$packageId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? $result['price'] : 0;
    } catch(PDOException $e) {
        return 0;
    }
}
?> 