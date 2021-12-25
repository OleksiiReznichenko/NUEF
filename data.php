<?php
$email = $_POST['email'];
$social = $_POST['social'];
$message = $_POST['message'];

$to = 'raleksey2005@gmail.com';
$subject = 'Mail from Website';
$txt = "Email = ". $email ."\r\n Social = ". $social ."\r\n Message = ". $message;

$headers = 'From: NUEF';

if ($email != NULL) {
    mail($to, $subject, $txt, $headers)
}

?>