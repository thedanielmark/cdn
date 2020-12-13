<?php

header('Access-Control-Allow-Origin: *');
error_reporting(0);

$servername = "xstack.mysql.database.azure.com";
$username = "licetadmin@xstack";
$password = "";
$dbname = "attendance";

// create connection
$conn = new mysqli($servername, $username, $password, $dbname);