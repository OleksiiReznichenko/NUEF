<?php
if (isset($_POST['submit'])) {
    // $headers = "MIME-Version: 1.0\r\n".
    //            "Content-type: text/html; charset=iso-8859-1\r\n";

    $to = "raleksey2005@gmail.com";
    $subject = "Form to email message";


    $email = $_POST['email'];
    $social = $_POST['social'];
    $message = $_POST['message'];


    $headers =  'MIME-Version: 1.0' . "\r\n";
    $headers .= 'From: ' . $email . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";


    $body = "Email : " . $email . "\r\n" .
        "Social : " . $social . "\r\n" .
        "Message : " . $message;

    // mail($to, $subject, $body, $headers);
    if (mail($to, $subject, $body, $headers)) {
        echo "Mail Sent!";
    } else {
        echo "Failed To Send Mail";
    };
    header('location:index.html');
};
