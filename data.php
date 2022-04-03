<?php
// Include required phpmailer files
require 'assets/includes/PHPMailer.php';
require 'assets/includes/SMTP.php';
require 'assets/includes/Exception.php';

// Define name spaces
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


if (isset($_POST['submit'])) {

    try {
        $email = $_POST['email'];
        $social = $_POST['social'];
        $message = $_POST['message'];
        $filePath = $_FILES['fileInput']['tmp_name'];
        $fileName = $_FILES['fileInput']['name'];


        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        // Create instance of phpmailer
        $mail = new PHPMailer(true);

        // $mail->SMTPDebug = 2;

        // Set mailer to use smtp
        $mail->isSMTP();

        // Define smtp host
        $mail->Host = "smtp.gmail.com";

        // Enable smtp authentication
        $mail->SMTPAuth = true;

        // Set type of encryption (ssl/tls)
        $mail->SMTPSecure = "tls";
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption

        // Set port to connect smtp
        $mail->Port = 587;
        // $mail->Port = 465;

        // Set gmail username
        $mail->Username = "ivan20005ivan@gmail.com";

        // Set gmail password
        $mail->Password = "rynf2343";

        // Set email subject
        $mail->Subject = 'From: ' . $email . "\r\n";

        // Set sender email
        $mail->setFrom("ivan20005ivan@gmail.com");

        // Email body
        $mail->Body = "Email : " . $email . "\r\n" .
            "Social : " . $social . "\r\n" .
            "Message : " . $message;

        if ($filePath) {
            // Add an attachment
            $mail->addAttachment($filePath, $fileName);
        }

        // Add recipient
        $mail->AddAddress("ivan20005ivan@gmail.com");

        $mail->Send();
        echo "Email Sent!";
        // header('location:index.html');
    } catch (Exception $e) {
        // echo $file;
        echo $e->getMessage();
    };

    // Close smtp connection
    $mail->smtpClose();
}
