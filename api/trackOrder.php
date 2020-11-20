<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require "../vendor/autoload.php";
require "settings.php";

$servername = "127.0.0.1";
$username = $sqlUser;
$password = $sqlPass;

$conn = new mysqli($servername, $username, $password, $sqlDb);

$request = isset($_GET['request']) ? $_GET['request'] : null;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// because we are posting JSON data, we use the php://input data
$data = json_decode(file_get_contents('php://input'), true);
$success = true;
$message = "";

$token = isset($data['token']) ? $conn->escape_string($data['token']) : '';
$paymentId = isset($data['paymentId']) ? $conn->escape_string($data['paymentId']) : '';
$PayerID = isset($data['PayerID']) ? $conn->escape_string($data['PayerID']) : '';
$user_id = isset($data['user_id']) ? intval($data['user_id']) : '';
$cartSummary = isset($data['cartSummary']) ? $conn->escape_string($data['cartSummary']) : '';

if(!empty($token)) {
  $sql = "insert into food_order (user_id, token, paymentId, PayerID, food_order_items, food_order_dtm, active) values ('$user_id', '$token', '$paymentId', '$PayerID', '$cartSummary', NOW(), 1)";
  $result = $conn->query($sql);
  if($conn->affected_rows == 0) {
    // when the form data is the same, there are no affected rows, but it is still a success
    $success = false;
    $message = "Order could not be tracked";
  }
  else {
    $order_id = $conn->insert_id;
  }
}
else {
  $success = false;
  $message = "Order data not available";
}

$return = array(
  'success' => $success,
  'message' => $message,
  'order_id' => $order_id
);

echo json_encode($return);
?>