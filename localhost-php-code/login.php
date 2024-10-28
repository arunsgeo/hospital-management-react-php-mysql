<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

$database = "hospital-mang-react";
$servername = "localhost:3308";
$username = "root";
$dbpassword = "";

$conn = new mysqli($servername, $username, $dbpassword, $database);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    // if (password_verify($password, $user['password'])) {
    if($password == $user['password']) {
        // $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_id'] = $user['email'];
        $session_id = session_id();
        echo json_encode(["success" => true, "session_id" => $session_id]);
    } else {
        echo json_encode(["success" => false, "message" => "Incorrect password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$stmt->close();
$conn->close();
?>
