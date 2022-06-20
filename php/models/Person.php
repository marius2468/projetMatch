<?php

class Person {
    private $connection;

    private $first_name;
    private $name;
    private $email;
    private $password;
    private $goal_nb;
    private $age;
    private $id_photo;
    private $id_city;
    private $id_physical_form;

    public function __construct($connection, $first_name, $name, $email, $password, $id_photo, $id_city, $first_name, $goal_nb = null, $age = null, $id_physical_form = null) {
        $this->connection = $connection;
        $this->first_name = $first_name;
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
        $this->goal_nb = $goal_nb;
        $this->age = $age;
        $this->id_photo = $id_photo;
        $this->id_city = $id_city;
        $this->id_physical_form = $id_physical_form;
    }

    public function createPerson(){
        try {
            $request = "INSERT INTO person(first_name, name, email, password, goal_nb, age, id_photo, id_city, id_physical_form)
                        VALUES (:first_name, :name, :email, :password, :goal_nb, :age, :id_photo, :id_city, :id_physical_form);";
            $statement = $this->connection->prepare($request);
            $statement->bindParam(':first_name', $this->first_name, PDO::PARAM_STR, 200);
            $statement->bindParam(':name', $this->name, PDO::PARAM_STR, 200);
            $statement->bindParam(':email', $this->email, PDO::PARAM_STR, 200);
            $statement->bindParam(':password', password_hash($this->password, PASSWORD_DEFAULT), PDO::PARAM_STR, 1000);
            $statement->bindParam(':goal_nb', 0, PDO::PARAM_INT);
            $statement->bindParam(':age', $this->age, PDO::PARAM_INT);
            $statement->bindParam(':id_photo', $this->id_photo, PDO::PARAM_INT);
            $statement->bindParam(':id_city', $this->id_city, PDO::PARAM_INT);
            $statement->bindParam(':$this->id_physical_form', $this->id_physical_form, PDO::PARAM_INT);
            $statement->execute();
        }
        catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
        return true;
    }
}