<?php

require_once('constants.php');

function dbConnect(){
    try {
        $db = new PDO('pgsql:host='.DB_SERVER.';port='.DB_PORT.';dbname='.DB_NAME, DB_USER, DB_PASSWORD);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch (PDOException $exception){
        error_log('Connection error: '.$exception->getMessage());
        return false;
    }
    return $db;
}

function dbLogin($db, $email, $passwd){
    try {
        $request = 'SELECT password, id_person FROM person WHERE email=:email';
        $statement = $db->prepare($request);
        $statement->bindParam(':email', $email, PDO::PARAM_STR, 200);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        if (password_verify($passwd, $result[0]['password'])){
            $_SESSION['id_person'] = $result[0]['id_person'];
            $result = true;
        }
        else{
            $result = false;
        }
    }
    catch (PDOException $exception){
        error_log('Request error: '.$exception->getMessage());
        return false;
    }
    return $result;
}

function dbRegister($db, $name, $first_name, $city, $email, $passwd){
    try {
        $request = 'SELECT id_person FROM person WHERE email=:email';
        $statement = $db->prepare($request);
        $statement->bindParam(':email', $email, PDO::PARAM_STR, 200);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        $passwd = password_hash($passwd, PASSWORD_DEFAULT);
        if ($result != NULL){
            $request = "INSERT INTO person (first_name, name, email, password, goal_nb, age, id_photo, id_city, id_physical_form)
                        VALUES (:first_name, :name, :email, :passwd, :goal_nb, :age, :id_photo, :id_city, :id_physical_form)";
            $statement = $db->prepare($request);
            $statement->bindParam(':first_name', $first_name, PDO::PARAM_STR, 200);
            $statement->bindParam(':name', $name, PDO::PARAM_STR, 200);
            $statement->bindParam(':email', $email, PDO::PARAM_STR, 200);
            $statement->bindParam(':passwd', $passwd, PDO::PARAM_STR, 1000);
            $statement->bindParam(':goal_nb', 0, PDO::PARAM_INT);
            $statement->bindParam(':age', null, PDO::PARAM_INT);
            $statement->bindParam(':id_photo', 1, PDO::PARAM_INT);
            $statement->bindParam(':id_city', 1, PDO::PARAM_INT);
            $statement->bindParam(':id_physical_form', 1, PDO::PARAM_INT);
            $statement->execute();
        }
        else{
            return false;
        }
    }
    catch (PDOException $exception){
        error_log('Request error: '.$exception->getMessage());
        return false;
    }
    return true;
}

function dbSearchMatch($db, $city, $sport, $period, $complete)
{
    try {
        $request = "SELECT c.city, s.sport, m.date_time, m.max_player_nb, count(p.id_player)
                    FROM match m 
                    INNER JOIN city c USING(id_city)
                    INNER JOIN sport s USING(id_sport)
                    INNER JOIN player_match p USING(id_match)
                    WHERE c.name=:nameCity 
                    AND s.name=:nameSport 
                    AND p.accept=true";
        if ($complete == true) {
            $request .= "AND m.max_player_nb = count(p.id_player)";
        } else {
            $request "AND m.max_player_nb > count(p.id_player)";
        }
        $statement = $db->prepare($request);
        $statement->bindParam(':nameCity', $city, PDO::PARAM_STR, 200);
        $statement->bindParam(':nameSport', $sport, PDO::PARAM_STR, 200);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    }
    catch (PDOException $exception) {
        error_log('Request error: ' . $exception->getMessage());
        return false;
    }
    return $result;
}