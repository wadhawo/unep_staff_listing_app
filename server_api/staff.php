<?php
require 'db.php';

$stmt = $pdo->query("SELECT * FROM staff ORDER BY id ASC");
$staff = $stmt->fetchAll();

echo json_encode($staff);
