<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../config/Database.php");

$db = new Database();

$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod == 'POST'){
    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->first_name) && !empty($data->name) && !empty($data->email) && !empty($data->password)
        && !empty($data->id_photo) && !empty($data->id_city)){
        require_once("../models/Person.php");
        $person = new Person($db->getConnection(), $data->first_name, $data->name, $data->email, $data->password, $data->id_photo, $data->id_city);
        if ($person->createPerson()){
            http_response_code(201);
            echo json_encode(["message" => "Person created with success"]);
        }
        else{
            http_response_code(503);
            echo json_encode(["message" => "We failed to create the person"]);
        }
        echo "Im in";
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