<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../config/Database.php");
require_once("../models/Person.php");

if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
    require_once("../config/Database.php");
    require_once("../models/Person.php");
    $db = new Database();
    $dataBase = $db->getConnection();
    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->id_person) && !empty($data->password) && !empty($data->id_photo) && !empty($data->id_city) && !empty($data->age) && !empty($data->id_physical_form)) {
        $person = new Person($dataBase);
        $person->password = $data->password;
        $person->id_photo = $data->id_photo;
        $person->id_city = $data->id_city;
        $person->age = $data->age;
        $person->id_physical_form = $data->id_physical_form;
        $result = $person->updatePerson($data->id_person);
        if ($result){
            http_response_code(200);
            echo json_encode(["message" => "Person update with success"]);
        }
        else{
            http_response_code(503);
            echo json_encode(["message" => "We failed to update the person"]);
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

/*

{
        "id_person": 1,
        "first_name": "Grant",
        "name": "Beldan",
        "email": "gbeldan0@nationalgeographic.com",
        "password": "gSCEln6Sw",
        "goal_nb": 0,
        "age": 48,
        "id_photo": 1,
        "id_city": 18,
        "id_physical_form": 1
    }

 */