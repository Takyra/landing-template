<?php
    require('PHPMailer/PHPMailerAutoload.php');

    $mail = new PHPMailer;
    $mail -> isSMTP();

    $mail -> Host       = 'mtp.yandex.ru';
    $mail -> SMTPAuth   = true;
    $mail -> Username   = 'email';
    $mail -> Password   = 'password';
    $mail -> SMTPSecure = 'ssl';
    $mail -> Port       = 465;
    $mail -> CharSet    = 'UTF-8';

    $mail -> setFrom('from email', 'no-reply');
    $mail -> addAddress('to email', 'Обработка заявок c сайта <Название сайта>');
    
    $mail -> isHTML(true);

    $mail -> Subject = 'Запрос обратного звонка.';
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