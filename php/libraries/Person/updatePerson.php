<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../../config/Database.php");
require_once("../../models/Person.php");

// process the PUT request from js to update a person and deal with errors
if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
    require_once("../../config/Database.php");
    require_once("../../models/Person.php");
    $db = new Database();
    $dataBase = $db->getConnection();
    parse_str(file_get_contents("php://input"), $data);
    if (!empty($_SESSION['id_person'])) {
        $person = new Person($dataBase);
        $person->password = $data['password'];
        $person->id_photo = $data['id_photo'];
        $person->id_city = $data['id_city'];
        $person->age = $data['age'];
        $person->id_physical_form = $data['id_physical_form'];
        $person->application_note = $data['application_note'];
        $result = $person->updatePerson($_SESSION['id_person']);
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