<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// process the GET request from js to get the user session and deal with errors
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
    require_once("../config/Database.php");
    $db = new Database();
    $dataBase = $db->getConnection();
    http_response_code(200);
    echo json_encode($_SESSION['id_person']);
}
else{
    http_response_code(405);
    echo json_encode(["message" => "This method is not allowed"]);
}