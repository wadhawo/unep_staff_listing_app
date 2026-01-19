<?php
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$stmt = $pdo->prepare("INSERT INTO staff
(index_number, full_names, email, current_location, highest_level_of_education, duty_station,
availability_for_remote_work, software_expertise, software_expertise_level, language, level_of_responsibility, created_by)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$params = [
    $data['indexNumber'], $data['fullNames'], $data['email'], $data['currentLocation'],
    $data['highestLevelOfEducation'], $data['dutyStation'], $data['availabilityForRemoteWork'],
    $data['softwareExpertise'], $data['softwareExpertiseLevel'], $data['language'],
    $data['levelOfResponsibility'], $data['createdBy']
];

if ($stmt->execute($params)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Failed to add staff']);
}
