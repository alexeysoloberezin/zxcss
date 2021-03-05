<?php 

require('mail.php');


$email = 'info@cleveru.ru';

if (!empty($_POST)) {
        $post = $_POST;
        // sending form
        if (isset($post['a-from__name-inp'])) {
            $name = $post['a-from__name-inp'];
        } else {
            $name = false;
        }

        if (isset($post['a-from__phone-inp'])) {
            $phone = $post['a-from__phone-inp'];
        } else {
            $phone = false;
        }

        if (isset($post['a-from__type-inp'])) {
            $type = $post['a-from__type-inp'];
        } else {
            $type = false;
        }

        if (isset($post['a-from__text-area'])) {
            $comment = $post['a-from__text-area'];
        } else {
            $comment = false;
        }

        $html = '';
        $html .= '<div style="max-width: 500px;border: 2px solid #eee;padding: 20px;font-size:14px;">';
        if ($name) {
            $html .= '<div style="padding:5px;"><b>Имя:</b> ' . $name . '</div>';
        }
        if ($phone) {
            $html .= '<div style="padding:5px;"><b>Телефон:</b> ' . $phone . '</div>';
        }
        if ($type) {
            $html .= '<div style="padding:5px;"><b>Тип уборки:</b> ' . $type . '</div>';
        }
        if ($comment) {
            $html .= '<div style="padding:5px;"><b>Что нужно почистить:</b> ' . $comment . '</div>';
        }
        $html .= '</div>';


        $mail = new Mail();
        $mail->protocol = 'mail';
        $mail->parameter = '';
        $mail->smtp_hostname = '';
        $mail->smtp_username = '';
        $mail->smtp_password = '';
        $mail->smtp_port = 25;
        $mail->smtp_timeout = 5;

        $mail->setTo($email);
        $mail->setFrom('info@clever.ru');
        $mail->setSender(html_entity_decode('Clever - Клининговая компания', ENT_QUOTES, 'UTF-8'));
        $mail->setSubject(html_entity_decode('Новая заявка с сайта сleverhim.ru', ENT_QUOTES, 'UTF-8'));
        $mail->setHtml($html);
        $mail->send();
}