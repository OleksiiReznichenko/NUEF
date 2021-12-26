<?php
// if(isset($_POST['submit'])){
    $headers = "MIME-Version: 1.0\r\n".
               "Content-type: text/html; charset=iso-8859-1\r\n";

    $to = "raleksey2005@gmail.com";
    $subject = "Form to email message";


    // $email = $_POST['email'];
    // $social = $_POST['social'];
    // $message = $_POST['message'];

    $email = "email";
    $social = "social";
    // $message = "message";


    // $body = "Email : ".$email. "\r\n" .
    // 		"Social : ".$social. "\r\n" .
    // 		"Message : " . $message;

    $message = "
        <html>
            <head>
                <title>Thank you</title>
            </head>
            <body>
                <h3>New Request</h3>
                <p>Email: $email</p>
                <p>Social: $social</p>
            </body>
        </html>
    ";

    if(mail($to, $subject, $message, $headers)){
        echo "Mail Sent!";
    }else{
        echo "Failed To Send Mail";
    };
//     header('location:index.html');
// };

?>

