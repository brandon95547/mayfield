<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require "settings.php";

$servername = "127.0.0.1";
$username = $sqlUser;
$password = $sqlPass;

$conn = new mysqli($servername, $username, $password, $sqlDb);

// $request = isset($_GET['request']) ? $_GET['request'] : null;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// because we are posting JSON data, we use the php://input data
$data = json_decode(file_get_contents('php://input'), true);
$success = true;
$row = array();
$message = "";

$order_id = isset($data['order_id']) && !empty($data['order_id']) ? $data['order_id'] : '';
$sql = "select * from food_order where food_order_id = '$order_id' and active = 1";
$result = $conn->query($sql);
if($result->num_rows > 0) {
  $row = $result->fetch_assoc();
}
else {
  $success = false;
  $message = "Order not found";
}

$return = array(
  'success' => $success,
  'message' => $message,
  'order' => $row,
);

echo json_encode($return);
?>