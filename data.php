<?php
// if (isset($_POST['submit'])) {
// // $headers = "MIME-Version: 1.0\r\n".
// //            "Content-type: text/html; charset=iso-8859-1\r\n";

// $to = "raleksey2005@gmail.com";
// $subject = "Form to email message";


// $email = $_POST['email'];
// $social = $_POST['social'];
// $message = $_POST['message'];
// $file = $_POST['file'];


// $headers =  'MIME-Version: 1.0' . "\r\n";
// $headers .= 'From: ' . $email . "\r\n";
// $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";


// // //Get uploaded file data using $_FILES array
// // $tmp_name    = $_FILES['file']['tmp_name']; // get the temporary file name of the file on the server
// // $name        = $_FILES['file']['name'];  // get the name of the file
// // $size        = $_FILES['file']['size'];  // get size of the file for size validation
// // $type        = $_FILES['file']['type'];  // get type of the file
// // $error       = $_FILES['file']['error']; // get the error (if any)

// // //validate form field for attaching the file
// // // if ($file_error > 0) {
// // //     die('Upload error or No files uploaded');
// // // }

// // //read from the uploaded file & base64_encode content
// // $handle = fopen($tmp_name, "r");  // set the file handle only for reading the file
// // $content = fread($handle, $size); // reading the file
// // fclose($handle);                  // close upon completion

// // $encoded_content = chunk_split(base64_encode($content));

// // $boundary = md5("random"); // define boundary with a md5 hashed value

// // if ($file_error > 0) {
// //     $body = "Email : " . $email . "\r\n" .
// //         "Social : " . $social . "\r\n" .
// //         "Message : " . $message;
// // } else {
// //     $body = "Email : " . $email . "\r\n" .
// //         "Social : " . $social . "\r\n" .
// //         "Message : " . $message . "\r\n" .
// //         "File: " . $encoded_content;
// // }


// $body = "Email : " . $email . "\r\n" .
//     "Social : " . $social . "\r\n" .
//     "Message : " . $message . "\r\n" .
//     "File : " . $file;

// // mail($to, $subject, $body, $headers);
// if (mail($to, $subject, $body, $headers)) {
//     echo "Mail Sent!";
// } else {
//     echo "Failed To Send Mail";
// };
// header('location:index.html');






if (isset($_POST['submit'])) {

    $allowedExtensions = array("pdf", "doc", "docx", "gif", "jpeg", "jpg", "png");

    $files = array();
    foreach ($_FILES as $name => $file) {
        $file_name = $file['name'];
        $temp_name = $file['tmp_name'];
        $file_type = $file['type'];
        $path_parts = pathinfo($file_name);
        $ext = $path_parts['extension'];
        if (!in_array($ext, $allowedExtensions)) {
            die("File $file_name has the extensions $ext which is not allowed");
        }
        array_push($files, $file);
    }

    // email fields: to, from, subject, and so on
    $to = "raleksey2005@gmail.com";
    $subject = "Form to email message";

    $email = $_POST['email'];
    $social = $_POST['social'];
    $message = $_POST['message'];

    $headers =  'MIME-Version: 1.0' . "\r\n";
    $headers .= 'From: ' . $email . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

    // boundary 
    $semi_rand = md5(time());
    $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";

    // headers for attachment 
    $headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\"";

    // multipart boundary 
    $body = "This is a multi-part message in MIME format.\n\n" . "--{$mime_boundary}\n" . "Content-Type: text/plain; charset=\"iso-8859-1\"\n" . "Content-Transfer-Encoding: 7bit\n\n" . $message . "\n\n";
    $body .= "--{$mime_boundary}\n";

    // preparing attachments
    for ($x = 0; $x < count($files); $x++) {
        $file = fopen($files[$x]['tmp_name'], "rb");
        $data = fread($file, filesize($files[$x]['tmp_name']));
        fclose($file);
        $data = chunk_split(base64_encode($data));
        $name = $files[$x]['name'];
        $body .= "Content-Type: {\"application/octet-stream\"};\n" . " name=\"$name\"\n" .
            "Content-Disposition: attachment;\n" . " filename=\"$name\"\n" .
            "Content-Transfer-Encoding: base64\n\n" . $data . "\n\n";
        $body .= "--{$mime_boundary}\n";
    }
    // send

    if (mail($to, $subject, $body, $headers)) {
        echo "<p>mail sent to $to!</p>";
    } else {
        echo "<p>mail could not be sent!</p>";
    };
    // header('location:index.html');
}
// };
