<?php

class Database {
    private $dbUser = "azerty";
    private $dbPassword = "azerty";
    private $dbName = "projetMatch";
    private $dbHost = "localhost";
    private $dbPort = "5432";
    public $connection;

    public function __construct(){

    }

    public function getConnection(){
        try {
            $this->connection = new PDO('pgsql:host='.$this->dbHost.';port='.$this->dbPort.';dbname='.$this->dbName, $this->dbUser, $this->dbPassword);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch (PDOException $exception){
            error_log('Connection error: '.$exception->getMessage());
            return false;
        }
        return $this->connection;
    }
}