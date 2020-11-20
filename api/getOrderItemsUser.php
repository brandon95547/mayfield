<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require "settings.php";

$servername = "127.0.0.1";
$username = $sqlUser;
$password = $sqlPass;

$conn = new mysqli($servername, $username, $password, $sqlDb);

$request = isset($_GET['request']) ? $_GET['request'] : null;
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$items = array();

$result = $conn->query("select * from food_order inner join user on user.user_id = food_order.user_id where user.user_id = $user_id and food_order.active = 1 and food_order_dtm LIKE concat(CURDATE(), '%') order by food_order_id DESC");
if($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $items[] = array(
      0 => $row['name'],
      // 1 => date("F j, Y, g:i a", strtotime($row['food_order_dtm'])),
      1 => $row['food_order_id'],
      2 => $row['ready'] ? "Yes" : "No",
    );
  }
}

echo json_encode($items, true);