<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// process the POST request from js to create a match and deal with errors
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    require_once("../../config/Database.php");
    require_once("../../models/Match.php");
    $db = new Database();
    $dataBase = $db->getConnection();
    parse_str(file_get_contents("php://input"), $data);
    if (!empty($data['address']) && !empty($data['date_time']) && !empty($data['price']) && !empty($_SESSION['id_person']) && !empty($data['id_sport']) && !empty($data['id_city']) && !empty($data['duration'])){
        $match = new Match($dataBase);
        $match->address = $data['address'];
        $match->date_time = $data['date_time'];
        $match->price = $data['price'];
        $match->id_sport = $data['id_sport'];
        $match->id_city = $data['id_city'];
        $match->duration = $data['duration'];

        if ($match->createMatch($_SESSION['id_person'])){
            http_response_code(201);
            echo json_encode(["message" => "Match created with success"]);
        }
        else{
            http_response_code(503);
            echo json_encode(["message" => "We failed to create the match"]);
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