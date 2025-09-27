<?php
require_once 'config.php';

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid data received']);
        exit;
    }

    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($username) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'Username and password are required']);
        exit;
    }

    // Get users from JSON file
    $users = readUsers();

    // Find user
    $foundUser = null;
    foreach ($users as $user) {
        if (strtolower($user['username']) === strtolower($username)) {
            $foundUser = $user;
            break;
        }
    }

    if (!$foundUser) {
        echo json_encode(['status' => 'error', 'message' => 'Account does not exist']);
        exit;
    }

    if ($foundUser['password'] !== $password) {
        echo json_encode(['status' => 'error', 'message' => 'Incorrect password']);
        exit;
    }

    // Remove password from user data before sending
    unset($foundUser['password']);

    echo json_encode([
        'status' => 'success',
        'message' => 'Login successful',
        'user' => $foundUser
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>