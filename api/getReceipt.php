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
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$foodItems = '{}';
$receipt = '';

$result = $conn->query("select * from food_order inner join user on user.user_id = food_order.user_id where food_order.active = 1 and food_order_id = $id");
if($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $foodItems = $row['food_order_items'];
  }
}

echo $foodItems;