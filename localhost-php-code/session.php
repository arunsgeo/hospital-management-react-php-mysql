<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start();
$data = json_decode(file_get_contents("php://input"), true);

if (session_id() === $data['session_id'] && isset($_SESSION['user_id'])) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>
