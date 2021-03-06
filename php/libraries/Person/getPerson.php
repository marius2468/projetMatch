<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// process the GET request from js to get a person and deal with errors
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
    require_once("../../config/Database.php");
    require_once("../../models/Person.php");
    $db = new Database();
    $dataBase = $db->getConnection();
    if (!empty($_GET['id_match'])) {
        $person = new Person($dataBase);
        $result = $person->getPerson($_GET['id_match'], null);
        if ($result){
            http_response_code(200);
            echo json_encode($result);
        }
        else{
            http_response_code(503);
            echo json_encode(["message" => "We failed to get the person for this match"]);
        }
    }
    elseif (!empty($_SESSION['id_person'])) {
        $person = new Person($dataBase);
        $result = $person->getPerson(null, $_SESSION['id_person']);
        if ($result){
            http_response_code(200);
            echo json_encode($result);
        }
        else{
            http_response_code(503);
            echo json_encode(["message" => "We failed to get the person"]);
        }
    }
}
else{
    http_response_code(405);
    echo json_encode(["message" => "This method is not allowed"]);
}