<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// process the DELETE request from js to delete a notification and deal with errors
if ($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    require_once("../../config/Database.php");
    require_once("../../models/Notification.php");
    $db = new Database();
    $dataBase = $db->getConnection();
    if (!empty($_GET['id_match']) && !empty($_GET['id_person'])) {
        $notification = new Notification($dataBase);
        if ($notification->deleteNotification($_GET['id_match'], $_GET['id_person'])){
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