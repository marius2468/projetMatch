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

    public function getMatchs($period, $id_sport, $id_city, $complete){
        try {
            $dateFuture = date('Y-m-d', strtotime($period));
            $dateToday = date('Y-m-d');
            $request = "SELECT c.name as name_city, s.name as name_sport, s.nb_max, m.date_time FROM match m
                        INNER JOIN city c USING(id_city)
                        INNER JOIN sport s USING(id_sport)
                        WHERE m.date_time<:dateFuture
                        AND m.date_time>:dateToday
                        AND c.id_city=:id_city
                        AND s.id_sport=:id_sport;";
            $statement = $this->connection->prepare($request);
            $statement->bindParam(':dateFuture', $dateFuture, PDO::PARAM_STR, 200);
            $statement->bindParam(':dateToday', $dateToday, PDO::PARAM_STR, 200);
            $statement->bindParam(':id_city', $id_city, PDO::PARAM_INT);
            $statement->bindParam(':id_sport', $id_sport, PDO::PARAM_INT);
            $statement->execute();
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        }
        catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
        return $result;
    }
}