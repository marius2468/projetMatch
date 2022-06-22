<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    require_once("../../config/Database.php");
    require_once("../../models/Person.php");
    $db = new Database();
    $dataBase = $db->getConnection();
    parse_str(file_get_contents("php://input"), $data);
    if (!empty($data['first_name']) && !empty($data['name']) && !empty($data['email']) && !empty($data['password']) && !empty($data['id_photo']) && !empty($data['id_city'])){
        $person = new Person($dataBase);
        $person->first_name = $data['first_name'];
        $person->name = $data['name'];
        $person->email = $data['email'];
        $person->password = $data['password'];
        $person->id_photo = $data['id_photo'];
        $person->id_city = $data['id_city'];
        if ($person->verifyPerson()){
            if ($person->createPerson()){
                http_response_code(201);
                echo json_encode(["message" => "Person created with success"]);
            }
            else{
                http_response_code(503);
                echo json_encode(["message" => "We failed to create the person"]);
            }
        }
        else{
            http_response_code(503);
            echo json_encode(["message" => "This person already exist"]);
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