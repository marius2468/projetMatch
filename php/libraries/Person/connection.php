<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if ($_SERVER['REQUEST_METHOD'] == 'GET'){
    require_once("../../config/Database.php");
    require_once("../../models/Person.php");
    $db = new Database();
    $dataBase = $db->getConnection();
    if (!empty($_GET['email']) && !empty($_GET['password'])) {
        $person = new Person($dataBase);
        $result = $person->connection($_GET['email'], $_GET['password']);
        if ($result){
            http_response_code(200);
            $_SESSION['id_person'] = $result;
            echo json_encode($_SESSION['id_person']);
        }
        else{
            http_response_code(503);
            echo json_encode(["message" => "We failed to connect the person"]);
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