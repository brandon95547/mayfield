<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require "../vendor/autoload.php";
require "settings.php";

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);
$error = '';
$errors = array();

$orderNumber = 'Thank you for using the Midway Drive In app. Your order is being prepared and you will received a notification when ready. Please provide the following number for pickup: '; 

$canContinue = !empty($orderNumber);

try {
    $mail->IsSMTP(); // enable SMTP
    $mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465; // or 587
    $mail->IsHTML(true);
    $mail->Username = $username;
    $mail->Password = $password;
    $mail->SetFrom("noreply@gmail.com");
    $mail->Subject = "Hounds Drive In Order";
    $mail->Body = $orderNumber;
    $mail->AddAddress($username);

    $mail->send();

} catch (Exception $e) {
    $error =  "$orderNumber";
    $errors[] = $error;
}
echo json_encode($errors);
