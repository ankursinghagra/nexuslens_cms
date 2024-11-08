<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MyPHPMailer {
    public function MyPHPMailer() {
        //require_once('PHPMailer/PHPMailerAutoload.php');
        require("PHPMailer/PHPMailer/src/PHPMailer.php");
        require("PHPMailer/libs/PHPMailer/src/SMTP.php");
    }
}