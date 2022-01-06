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


    //Get uploaded file data using $_FILES array
    $tmp_name    = $_FILES['file']['tmp_name']; // get the temporary file name of the file on the server
    $name        = $_FILES['file']['name'];  // get the name of the file
    $size        = $_FILES['file']['size'];  // get size of the file for size validation
    $type        = $_FILES['file']['type'];  // get type of the file
    $error       = $_FILES['file']['error']; // get the error (if any)

    //validate form field for attaching the file
    // if ($file_error > 0) {
    //     die('Upload error or No files uploaded');
    // }

    //read from the uploaded file & base64_encode content
    $handle = fopen($tmp_name, "r");  // set the file handle only for reading the file
    $content = fread($handle, $size); // reading the file
    fclose($handle);                  // close upon completion

    $encoded_content = chunk_split(base64_encode($content));

    $boundary = md5("random"); // define boundary with a md5 hashed value

    if ($file_error > 0) {
        $body = "Email : " . $email . "\r\n" .
            "Social : " . $social . "\r\n" .
            "Message : " . $message;
    } else {
        $body = "Email : " . $email . "\r\n" .
            "Social : " . $social . "\r\n" .
            "Message : " . $message . "\r\n" .
            "File: " . $encoded_content;
    }


    // mail($to, $subject, $body, $headers);
    if (mail($to, $subject, $body, $headers)) {
        echo "Mail Sent!";
    } else {
        echo "Failed To Send Mail";
    };
    // header('location:index.html');
};
