<?php

class Match {
    private $connection;

    public $address;
    public $date_time;
    public $price;
    public $score;
    public $id_sport;
    public $id_city;
    public $duration;

    public function __construct($connection) {
        $this->connection = $connection;
    }

    public function createMatch($id_person){
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->date_time = htmlspecialchars(strip_tags($this->date_time));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->score = null;
        $this->id_sport = htmlspecialchars(strip_tags($this->id_sport));
        $this->id_city = htmlspecialchars(strip_tags($this->id_city));
        $this->duration = htmlspecialchars(strip_tags($this->duration));
        try {
            $request = "INSERT INTO match(address, date_time, price, score, id_person, id_sport, id_city, duration)
                        VALUES (:address, :date_time, :price, :score, :id_person, :id_sport, :id_city, :duration);";
            $statement = $this->connection->prepare($request);
            $statement->bindParam(':address', $this->address, PDO::PARAM_STR, 200);
            $statement->bindParam(':date_time', $this->date_time, PDO::PARAM_STR, 200);
            $statement->bindParam(':price', $this->price, PDO::PARAM_INT);
            $statement->bindParam(':score', $this->score, PDO::PARAM_STR, 50);
            $statement->bindParam(':id_person', $id_person, PDO::PARAM_INT);
            $statement->bindParam(':id_sport', $this->id_sport, PDO::PARAM_INT);
            $statement->bindParam(':id_city', $this->id_city, PDO::PARAM_INT);
            $statement->bindParam(':duration', $this->duration, PDO::PARAM_STR, 200);
            $statement->execute();
        }
        catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
        return true;
    }

    public function getMatchs($period, $id_sport, $id_city, $complete){
        if ($complete == 2) { //complete
            try {
                $dateFuture = date('Y-m-d', strtotime($period));
                $dateToday = date('Y-m-d');
                $request = "SELECT c.name as city_name, s.name as name_sport, s.nb_max, m.date_time, m.id_match, p.path, pm.count 
                            FROM match m
                            INNER JOIN city c USING(id_city)
                            INNER JOIN sport s USING(id_sport)
                            INNER JOIN photo p USING(id_photo)
                            LEFT JOIN (SELECT id_match, count(p.id_person) as count FROM player_match p
                                        WHERE accept=true
                                        GROUP BY id_match) pm USING(id_match)
                            WHERE m.date_time<:dateFuture
                            AND m.date_time>=:dateToday
                            AND c.id_city=:id_city
                            AND s.id_sport=:id_sport
                            AND s.nb_max = pm.count;";
                $statement = $this->connection->prepare($request);
                $statement->bindParam(':dateFuture', $dateFuture, PDO::PARAM_STR, 200);
                $statement->bindParam(':dateToday', $dateToday, PDO::PARAM_STR, 200);
                $statement->bindParam(':id_city', $id_city, PDO::PARAM_INT);
                $statement->bindParam(':id_sport', $id_sport, PDO::PARAM_INT);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);

            } catch (PDOException $exception) {
                error_log('Request error: ' . $exception->getMessage());
                return false;
            }
        }
        else { //no complete
            try {
                $dateFuture = date('Y-m-d', strtotime($period));
                $dateToday = date('Y-m-d');
                $request = "SELECT c.name as city_name, s.name as name_sport, s.nb_max, m.date_time, m.id_match, p.path, pm.count 
                        FROM match m
                        INNER JOIN city c USING(id_city)
                        INNER JOIN sport s USING(id_sport)
                        INNER JOIN photo p USING(id_photo)    
                        LEFT JOIN (SELECT id_match, count(p.id_person) as count FROM player_match p
                        WHERE accept=true
                        GROUP BY id_match) pm USING(id_match)
                        WHERE m.date_time<:dateFuture
                        AND m.date_time>=:dateToday
                        AND c.id_city=:id_city
                        AND s.id_sport=:id_sport;";
                $statement = $this->connection->prepare($request);
                $statement->bindParam(':dateFuture', $dateFuture, PDO::PARAM_STR, 200);
                $statement->bindParam(':dateToday', $dateToday, PDO::PARAM_STR, 200);
                $statement->bindParam(':id_city', $id_city, PDO::PARAM_INT);
                $statement->bindParam(':id_sport', $id_sport, PDO::PARAM_INT);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);

            } catch (PDOException $exception) {
                error_log('Request error: ' . $exception->getMessage());
                return false;
            }
        }
        return $result;
    }

    public function getMatch($id_match){
        try {
            $request = "SELECT m.address || ', ' || c.zip_code || ' ' || c.name || ', France' as address,
                        ph.path, p.first_name, p.name as person_name, m.duration , m.price , pm.count, s.nb_max, m.date_time
                        FROM match m
                        INNER JOIN person p on p.id_person = m.id_person
                        INNER JOIN sport s on s.id_sport = m.id_sport
                        INNER JOIN photo ph on ph.id_photo = p.id_photo
                        INNER JOIN city c on c.id_city = m.id_city
                        LEFT JOIN (SELECT id_match, count(p.id_person) as count FROM player_match p
                                    WHERE accept=true
                                    GROUP BY id_match) pm USING(id_match)
                        WHERE id_match=:id_match;";
            $statement = $this->connection->prepare($request);
            $statement->bindParam(':id_match', $id_match, PDO::PARAM_INT);
            $statement->execute();
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception) {
            error_log('Request error: ' . $exception->getMessage());
            return false;
        }
        return $result;
    }

    public function getStats($id_person){
        try {
            $request = "SELECT c.name as city_name, s.name as name_sport, s.nb_max, m.date_time, m.id_match, p.path, pm.count 
                        FROM match m
                        INNER JOIN city c USING(id_city)
                        INNER JOIN sport s USING(id_sport)
                        INNER JOIN photo p USING(id_photo)    
                        LEFT JOIN (SELECT id_match, count(p.id_person) as count FROM player_match p
                        WHERE accept=true
                        GROUP BY id_match) pm USING(id_match)
                        WHERE m.score = '' OR m.score IS NULL
                        AND m.id_person=:id_person;";
            $statement = $this->connection->prepare($request);
            $statement->bindParam(':id_person', $id_person, PDO::PARAM_INT);
            $statement->execute();
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception) {
            error_log('Request error: ' . $exception->getMessage());
            return false;
        }
        return $result;
    }


    public function updateMatch($id_match, $id_person, $score){
        try {
            $request = "UPDATE player_match SET best_player=true WHERE id_match=:id_match AND id_person=:id_person;";
            $statement = $this->connection->prepare($request);
            $statement->bindParam(':id_match', $id_match, PDO::PARAM_INT);
            $statement->bindParam(':id_person', $id_person, PDO::PARAM_INT);
            if ($statement->execute()){
                $request2 = "UPDATE match SET score=:score WHERE id_match=:id_match;";
                $statement2 = $this->connection->prepare($request2);
                $statement2->bindParam(':id_match', $id_match, PDO::PARAM_INT);
                $statement2->bindParam(':score', $score, PDO::PARAM_STR, 50);
                $statement2->execute();
            }
        }
        catch (PDOException $exception) {
            error_log('Request error: ' . $exception->getMessage());
            return false;
        }
        return true;
    }

    public function getMatchPassedFuture($id_person, $passed){
        if ($passed == 2){
            try {
                $date_time = date('Y-m-d');
                $request = "SELECT pm.id_match, m.score, c.name as city_name, s.name as name_sport, m.date_time, p.path, zz.name, zz.first_name, ph.path as sportPath
                            FROM player_match pm
                            INNER JOIN match m USING(id_match)
                            INNER JOIN city c on m.id_city=c.id_city
                            INNER JOIN sport s on m.id_sport=s.id_sport
                            INNER JOIN photo ph on ph.id_photo = s.id_photo
                            LEFT JOIN (SELECT p.name, p.first_name, p.id_photo, pm.id_match FROM person p INNER JOIN player_match pm USING (id_person) WHERE best_player=true) zz USING (id_match)
                            LEFT JOIN photo p on p.id_photo=zz.id_photo
                            WHERE pm.id_person=:id_person
                            AND m.date_time<:date_time;";
                $statement = $this->connection->prepare($request);
                $statement->bindParam(':date_time', $date_time, PDO::PARAM_STR, 200);
                $statement->bindParam(':id_person', $id_person, PDO::PARAM_INT);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);

            } catch (PDOException $exception) {
                error_log('Request error: ' . $exception->getMessage());
                return false;
            }
        }
        else{
            try {
                $date_time = date('Y-m-d');
                $request = "SELECT pm.id_match, c.name as city_name, s.name as name_sport, s.nb_max, m.date_time, p.path, zz.count
                            FROM player_match pm
                            INNER JOIN match m USING(id_match)
                            INNER JOIN city c on m.id_city=c.id_city
                            INNER JOIN sport s on m.id_sport=s.id_sport
                            INNER JOIN photo p on p.id_photo = s.id_photo
                            LEFT JOIN (SELECT id_match, count(p.id_person) as count FROM player_match p
                            WHERE accept=true
                            GROUP BY id_match) zz USING(id_match)
                            WHERE pm.id_person=:id_person
                            AND m.date_time>=:date_time;";
                $statement = $this->connection->prepare($request);
                $statement->bindParam(':date_time', $date_time, PDO::PARAM_STR, 200);
                $statement->bindParam(':id_person', $id_person, PDO::PARAM_INT);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);

            } catch (PDOException $exception) {
                error_log('Request error: ' . $exception->getMessage());
                return false;
            }
        }
        return $result;
    }
}