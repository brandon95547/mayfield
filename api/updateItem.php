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

$id = isset($data['id']) && !empty($data['id']) ? $conn->escape_string($data['id']) : '';
$title = isset($data['title']) && !empty($data['title']) ? $conn->escape_string($data['title']) : '';
$price = isset($data['price']) && !empty($data['price']) ? floatval($data['price']) : '';
$category = isset($data['category']) && !empty($data['category']) ? $conn->escape_string($data['category']) : '';
$isAvailable = isset($data['isAvailable']) ? intval($data['isAvailable']) : '';

if(!empty($id) && !empty($title) && !empty($price) && !empty($category)) {
  $sql = "update food set food_title='$title', food_price='$price', food_category='$category', in_stock='$isAvailable' where food_id = $id";
  $result = $conn->query($sql);
  if($result->affected_rows == 0) {
    // when the form data is the same, there are no affected rows, but it is still a success
    // $success = false;
    // $message = "Item could not be updated";
  }
}
else {
  $success = false;
  $message = "All fields are required";
}

$return = array(
  'success' => $success,
  'message' => $message,
  'data' => array($id, $title, $price, $category, $sql)
);

echo json_encode($return);
?>