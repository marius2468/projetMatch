<?php

class Notification {
    private $connection;

    public function __construct($connection) {
        $this->connection = $connection;
    }

    public function getNotification($id_person){
        try {
            $request = "SELECT p.name, p.first_name, p.id_person, p2.path, m.id_match, m.date_time, m.address || ', ' || c.zip_code || ' ' || c.name || ', France' as address
                        FROM player_match pm
                        INNER JOIN person p USING (id_person)
                        INNER JOIN photo p2 on p2.id_photo = p.id_photo    
                        INNER JOIN match m USING (id_match)
                        INNER JOIN city c on m.id_city = c.id_city
                        WHERE accept=false
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

    public function updateNotification($id_match, $id_person){
        try {
            $request = "UPDATE player_match
                        SET accept = true
                        WHERE id_match=:id_match AND id_person=:id_person;";
            $statement = $this->connection->prepare();
            $statement->bindParam(':id_match', $id_match, PDO::PARAM_INT);
            $statement->bindParam(':id_person', $id_person, PDO::PARAM_INT);
            $statement->execute();
        }
        catch (PDOException $exception) {
            error_log('Request error: ' . $exception->getMessage());
            return false;
        }
        return true;
    }

    public function deleteNotification($id_match, $id_person){
        try {
            $request = "DELETE FROM player_match
                        WHERE id_match=:id_match AND id_person=:id_person";
            $statement = $this->connection->prepare();
            $statement->bindParam(':id_match', $id_match, PDO::PARAM_INT);
            $statement->bindParam(':id_person', $id_person, PDO::PARAM_INT);
            $statement->execute();
        }
        catch (PDOException $exception) {
            error_log('Request error: ' . $exception->getMessage());
            return false;
        }
        return true;
    }

    public function createNotification($id_match, $id_person){
        try {
            $request = "INSERT INTO player_match (id_match, id_person, nb_goal, best_player, accept)
                        VALUES (:id_match, :id_person, null, false, false)";
            $statement = $this->connection->prepare($request);
            $statement->bindParam(':id_match', $id_match, PDO::PARAM_INT);
            $statement->bindParam(':id_person', $id_person, PDO::PARAM_INT);
            $statement->execute();
        }
        catch (PDOException $exception) {
            error_log('Request error: ' . $exception->getMessage());
            return false;
        }
        return true;
    }
}