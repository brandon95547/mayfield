<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require "../vendor2/autoload.php";
    
$channelName = '';
$recipient= 'ExponentPushToken[GMPCGBGSg15-G-Ezu9Y2yx]';

// You can quickly bootup an expo instance
$expo = \ExponentPhpSDK\Expo::normalSetup();

// Subscribe the recipient to the server
$expo->subscribe($channelName, $recipient);

// Build the notification data
// $notification = ['body' => 'Hello World!'];

$notification = ['body' => 'Hounds Order Ready!', 'data'=> json_encode(array('message' => 'Your order is ready for pickup. Please bring your order ID (98) with you.'))];

// Notify an interest with a notification
$expo->notify([$channelName], $notification);