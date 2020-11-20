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

$user = isset($data['user']) ? $data['user'] : array();

if(!empty($user)) {
  $sql = "update user set user.token = '{$user['token']}' where user_id = '{$user['user_id']}'";
  $result = $conn->query($sql);
  if($conn->affected_rows == 0) {
    // when the form data is the same, there are no affected rows, but it is still a success
    $success = false;
    $message = "User could not be updated.";
  }
}
else {
  $success = false;
  $message = "Unknown error";
}

$return = array(
  'success' => $success,
  'message' => $message,
  'sql' => $sql
);

echo json_encode($return);
?>