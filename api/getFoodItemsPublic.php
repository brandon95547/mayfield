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

$items1 = array();
$items2 = array();
$items3 = array();
$items4 = array();
$items5 = array();

$cat1 = $conn->query("select * from food where active = 1 and food_category = 'FROM THE GRILL' and in_stock = 1");
$cat2 = $conn->query("select * from food where active = 1 and food_category = 'SNACKS' and in_stock = 1");
$cat3 = $conn->query("select * from food where active = 1 and food_category = 'BEVERAGES' and in_stock = 1");
$cat4 = $conn->query("select * from food where active = 1 and food_category = 'MISCELLANEIOUS' and in_stock = 1");

if($cat1->num_rows > 0) {
  while($row = $cat1->fetch_assoc()) {
    $items1[] = array(
      0 => $row['food_title'],
      1 => $row['food_price'],
      2 => $row['in_stock'],
      3 => $row['food_id']
    );
  }
}
if($cat2->num_rows > 0) {
  while($row = $cat2->fetch_assoc()) {
    $items2[] = array(
      0 => $row['food_title'],
      1 => $row['food_price'],
      2 => $row['in_stock'],
      3 => $row['food_id']
    );
  }
}
if($cat3->num_rows > 0) {
  while($row = $cat3->fetch_assoc()) {
    $items3[] = array(
      0 => $row['food_title'],
      1 => $row['food_price'],
      2 => $row['in_stock'],
      3 => $row['food_id']
    );
  }
}
if($cat4->num_rows > 0) {
  while($row = $cat4->fetch_assoc()) {
    $items4[] = array(
      0 => $row['food_title'],
      1 => $row['food_price'],
      2 => $row['in_stock'],
      3 => $row['food_id']
    );
  }
}

$items = array(
  0 => $items1,
  1 => $items2,
  2 => $items3,
  3 => $items4,
  4 => $items5,
);

echo json_encode($items, true);