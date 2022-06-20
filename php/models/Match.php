<?php

class Match {
    private $connection;

    public $address;
    public $date_time;
    public $price;
    public $score;
    public $id_person;
    public $id_sport;
    public $id_city;

    public function __construct($connection) {
        $this->connection = $connection;
    }

    public function createMatch(){
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->date_time = htmlspecialchars(strip_tags($this->date_time));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->score = null;
        $this->id_person = htmlspecialchars(strip_tags($this->id_person));
        $this->id_sport = htmlspecialchars(strip_tags($this->id_sport));
        $this->id_city = htmlspecialchars(strip_tags($this->id_city));
        try {
            $request = "INSERT INTO match(address, date_time, price, score, id_person, id_sport, id_city)
                        VALUES (:address, :date_time, :price, :score, :id_person, :id_sport, :id_city);";
            $statement = $this->connection->prepare($request);
            $statement->bindParam(':address', $this->address, PDO::PARAM_STR, 200);
            $statement->bindParam(':date_time', $this->date_time, PDO::PARAM_STR, 200);
            $statement->bindParam(':price', $this->price, PDO::PARAM_INT);
            $statement->bindParam(':score', $this->score, PDO::PARAM_STR, 50);
            $statement->bindParam(':id_person', $this->id_person, PDO::PARAM_INT);
            $statement->bindParam(':id_sport', $this->id_sport, PDO::PARAM_INT);
            $statement->bindParam(':id_city', $this->id_city, PDO::PARAM_INT);
            $statement->execute();
        }
        catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
        return true;
    }
}