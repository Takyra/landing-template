<?php
    require('PHPMailer/PHPMailerAutoload.php');

    $mail = new PHPMailer;
    $mail -> isSMTP();

    $mail -> Host       = 'smtp.gmail.com';
    $mail -> SMTPAuth   = true;
    $mail -> Username   = 'SomeGenHome@gmail.com';
    $mail -> Password   = 'utyf380625';
    $mail -> SMTPSecure = 'ssl';
    $mail -> Port       = 465;
    $mail -> CharSet    = 'UTF-8';

    $mail -> setFrom('SomeGenHome@gmail.com', 'no-reply');
    $mail -> addAddress('SomeGenHome@gmail.com', 'Обработка заявок');
    
    $mail -> isHTML(true);

    $mail -> Subject = 'Запрос обратного звонка с сайта';
    $mail -> Body = '
        <html>
            <head>
                <title>'.$subject.'</title>
            </head>
            <body>
                <p>Имя     : '.$_POST['name'].'</p>
                <p>Телефон : '.$_POST['phone'].'</p>
                <p>E-mail  : '.$_POST['email'].'</p>
            </body>
        </html>';


    if (!$mail -> send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail -> ErrorInfo;
    } else {
        echo 'Message has been sent';
    }