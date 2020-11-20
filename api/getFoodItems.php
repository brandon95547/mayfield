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

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$items = array();

$result = $conn->query("select * from food where active = 1");
if($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $items[] = array(
      0 => $row['food_title'],
      1 => $row['food_price'],
      2 => $row['food_category'],
      3 => $row['food_id'],
      4 => $row['in_stock'],
    );
  }
}

echo json_encode($items, true);