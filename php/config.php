<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$jsonFile = __DIR__ . '/../js/users.json';

$jsonFile = "../js/users.json";

// Function to read users from JSON file
function readUsers() {
    global $jsonFile;
    if (file_exists($jsonFile)) {
        $jsonContent = file_get_contents($jsonFile);
        return json_decode($jsonContent, true) ?: [];
    }
    return [];
}

// Function to write users to JSON file
function writeUsers($users) {
    global $jsonFile;
    file_put_contents($jsonFile, json_encode($users, JSON_PRETTY_PRINT));
}
?>