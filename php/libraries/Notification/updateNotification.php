<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
    require_once("../../config/Database.php");
    require_once("../../models/Notification.php");
    $db = new Database();
    $dataBase = $db->getConnection();
    parse_str(file_get_contents("php://input"), $data);
    if (!empty($data['id_match']) && !empty($data['id_person'])) {
        $notification = new Notification($dataBase);
        if ($notification->updateNotification($data['id_match'], $data['id_person'])){
            http_response_code(200);
            echo json_encode(["message" => "Match update with success"]);
        }
        else{
            http_response_code(503);
            echo json_encode(["message" => "We failed to update the match"]);
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