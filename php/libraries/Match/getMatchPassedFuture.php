<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// process the GET request from js to create a passed match and deal with errors
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
    require_once("../../config/Database.php");
    require_once("../../models/Match.php");
    $db = new Database();
    $dataBase = $db->getConnection();
    if (!empty($_SESSION['id_person']) && !empty($_GET['passed'])) {
        $match = new Match($dataBase);
        $result = $match->getMatchPassedFuture($_SESSION['id_person'], $_GET['passed']);
        if ($result){
            http_response_code(200);
            echo json_encode($result);
        }
        else{
            http_response_code(503);
            echo json_encode(["message" => "No match for these filter"]);
        }
    }
    else{
        http_response_code(400);
        echo json_encode(["message" => "There is empty values"]);
    }
}
else{
    http_response_code(405);
    echo json_encode(["message" => "This method is not allowed"]);
}