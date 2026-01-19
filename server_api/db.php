<?php
$host = 'localhost';
$db   = 'unep_staff_db';
$user = 'wadhawo';
$pass = 'Walter254';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

function generate_bcrypt_hash($pwd_string) {
    return password_hash($pwd_string, PASSWORD_BCRYPT);
}
