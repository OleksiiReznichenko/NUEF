<?php
if(isset($_POST['submit'])){
    $to = "raleksey2005@gmail.com";
    $subject = "Form to email message";


    $email = $_POST['email'];
    $social = $_POST['social'];
    $message = $_POST['message'];
    $headers = 'From: '.$email . "\r\n";


    $body = "Email : ".$email. "\r\n" .
    		"Social : ".$social. "\r\n" .
    		"Message : " . $message;
    if(mail($to, $subject, $body, $headers)){
        echo "Mail Sent!";
    }else{
        echo "Failed To Send Mail";
    };
    header('location:index.html');
};

?>