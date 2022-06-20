<?php

class Match {
    private $connection;
    private $table = "match";

    private $id_match;
    private $address;
    private $date_time;
    private $price;
    private $score;
    private $id_person;
    private $id_sport;
    private $id_city;

    public function __construct($connection, $id_match, $address, $date_time, $price, $id_person, $id_sport, $id_city, $score = null) {
        $this->connection = $connection;
        $this->id_match = $id_match;
        $this->address = $address;
        $this->date_time = $date_time;
        $this->price = $price;
        $this->score = $score;
        $this->id_person = $id_person;
        $this->id_sport = $id_sport;
        $this->id_city = $id_city;
    }

    /**
     * @return mixed
     */
    public function getIdMatch()
    {
        return $this->id_match;
    }

    /**
     * @return mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @return mixed
     */
    public function getDateTime()
    {
        return $this->date_time;
    }

    /**
     * @return mixed
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @return mixed
     */
    public function getScore()
    {
        return $this->score;
    }

    /**
     * @return mixed
     */
    public function getIdPerson()
    {
        return $this->id_person;
    }

    /**
     * @return mixed
     */
    public function getIdSport()
    {
        return $this->id_sport;
    }

    /**
     * @return mixed
     */
    public function getIdCity()
    {
        return $this->id_city;
    }

    /**
     * @return mixed
     */
    public function getConnection()
    {
        return $this->connection;
    }
}