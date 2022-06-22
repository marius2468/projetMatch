<?php

class Database {
    private $dbUser = "azerty";
    private $dbPassword = "azerty";
    private $dbName = "projetmatch";
    private $dbHost = "localhost";
    private $dbPort = "5432";
    public $connection;

    public function getConnection(){
        try {
            session_start();
            $this->connection = new PDO('pgsql:host='.$this->dbHost.';port='.$this->dbPort.';dbname='.$this->dbName, $this->dbUser, $this->dbPassword);
            $this->connection->exec("set names utf8");
        }
        catch (PDOException $exception){
            error_log('Connection error: '.$exception->getMessage());
            return false;
        }
        return $this->connection;
    }
}