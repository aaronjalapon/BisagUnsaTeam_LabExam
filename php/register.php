<?php
require_once 'config.php';

// Log access to this script
error_log('Register.php accessed with method: ' . $_SERVER['REQUEST_METHOD']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $rawData = file_get_contents('php://input');
    error_log('Received raw data: ' . $rawData);
    
    // Decode the JSON data
    $data = json_decode($rawData, true);
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid data received']);
        exit;
    }

    // Extract user data
    $fullName = $data['fullName'] ?? '';
    $email = $data['email'] ?? '';
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    // Basic validation
    if (empty($fullName) || empty($email) || empty($username) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        exit;
    }

    // Get existing users
    $users = readUsers();

    // Check for existing username or email
    foreach ($users as $user) {
        if (strtolower($user['username']) === strtolower($username)) {
            echo json_encode(['status' => 'error', 'message' => 'Username already exists']);
            exit;
        }
        if (strtolower($user['email']) === strtolower($email)) {
            echo json_encode(['status' => 'error', 'message' => 'Email already registered']);
            exit;
        }
    }

    // Create new user
    $newUser = [
        'fullName' => $fullName,
        'email' => $email,
        'username' => $username,
        'password' => $password, // In production, you should hash the password
        'registeredDate' => date('Y-m-d H:i:s')
    ];

    // Add user to array
    $users[] = $newUser;

    // Save updated users array
    writeUsers($users);

    echo json_encode(['status' => 'success', 'message' => 'Registration successful']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>