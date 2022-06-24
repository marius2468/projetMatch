<?php

class Person {
    private $connection;

    public $first_name;
    public $name;
    public $email;
    public $password;
    public $goal_nb;
    public $age;
    public $id_photo;
    public $id_city;
    public $id_physical_form;
    public $application_note;

    /**
     * function to construct a person with the connection attribute
     * @param $connection
     */
    public function __construct($connection) {
        $this->connection = $connection;
    }

    /**
     * function verifying if a user already exist
     * @return bool
     */
    public function verifyPerson(){
        try {
            $request = "SELECT email FROM person WHERE email=:email";
            $statement = $this->connection->prepare($request);
            $statement->bindParam(':email', $this->email, PDO::PARAM_STR, 200);
            $statement->execute();
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
        if (count($result) > 0){
            return false;
        }
        return true;
    }

    /**
     * function using an SQL request to create a person in the database
     * @return false|mixed
     */
    public function createPerson(){
        $this->first_name = htmlspecialchars(strip_tags($this->first_name));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = password_hash(htmlspecialchars(strip_tags($this->password)), PASSWORD_DEFAULT);
        $this->goal_nb = 0;
        $this->age = null;
        $this->id_photo = htmlspecialchars(strip_tags($this->id_photo));
        $this->id_city = htmlspecialchars(strip_tags($this->id_city));
        $this->id_physical_form = null;
        try {
            $request = "INSERT INTO person(first_name, name, email, password, goal_nb, age, id_photo, id_city, id_physical_form)
                        VALUES (:first_name, :name, :email, :password, :goal_nb, :age, :id_photo, :id_city, :id_physical_form);";
            $statement = $this->connection->prepare($request);
            $statement->bindParam(':first_name', $this->first_name, PDO::PARAM_STR, 200);
            $statement->bindParam(':name', $this->name, PDO::PARAM_STR, 200);
            $statement->bindParam(':email', $this->email, PDO::PARAM_STR, 200);
            $statement->bindParam(':password', $this->password, PDO::PARAM_STR, 1000);
            $statement->bindParam(':goal_nb', $this->goal_nb, PDO::PARAM_INT);
            $statement->bindParam(':age', $this->age, PDO::PARAM_INT);
            $statement->bindParam(':id_photo', $this->id_photo, PDO::PARAM_INT);
            $statement->bindParam(':id_city', $this->id_city, PDO::PARAM_INT);
            $statement->bindParam(':id_physical_form', $this->id_physical_form, PDO::PARAM_INT);
            if ($statement->execute()){
                $request2 = "SELECT id_person FROM person WHERE email=:email;";
                $statement2 = $this->connection->prepare($request2);
                $statement2->bindParam(':email', $this->email, PDO::PARAM_STR, 200);
                $statement2->execute();
                $res = $statement2->fetchAll(PDO::FETCH_ASSOC);
                $result = $res[0]['id_person'];
            }
        }
        catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
        return $result;
    }

    /**
     * function using an SQL request to get a person or a match in the database from their id's
     * @param $id_match
     * @param $id_person
     * @return false
     */
    public function getPerson($id_match, $id_person){
        if ($id_person != null){
            try {
                $request = "SELECT pe.*, p.path, c.name as name_city, f.name as name_form, m.count FROM person pe
                            INNER JOIN photo p USING (id_photo)
                            LEFT JOIN physical_form f USING (id_physical_form)
                            INNER JOIN city c USING (id_city)
                            LEFT JOIN (SELECT id_person, count(id_person) as count 
                                        FROM player_match GROUP BY id_person) m 
                            USING (id_person) 
                            WHERE id_person=:id_person;";
                $statement = $this->connection->prepare($request);
                $statement->bindParam(':id_person', $id_person, PDO::PARAM_INT);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            }
            catch(PDOException $exception){
                error_log('Request error: '.$exception->getMessage());
                return false;
            }
        }
        if ($id_match != null){
            try {
                $request = "SELECT p.first_name, p.name, m.count, pe.id_person, po.path 
                            FROM person p 
                            INNER JOIN photo po USING (id_photo)
                            INNER JOIN (SELECT id_person, count(id_person) as count 
                                        FROM player_match GROUP BY id_person) m 
                            USING (id_person) 
                            INNER JOIN player_match pe USING(id_person) WHERE pe.id_match=:id_match AND pe.accept=true;";
                $statement = $this->connection->prepare($request);
                $statement->bindParam(':id_match', $id_match, PDO::PARAM_INT);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            }
            catch(PDOException $exception){
                error_log('Request error: '.$exception->getMessage());
                return false;
            }
        }
        return $result;
    }

    /**
     * function using an SQL request to update a person in the database
     * @param $id_person
     * @return bool|void
     */
    public function updatePerson($id_person){
        $this->id_photo = htmlspecialchars(strip_tags($this->id_photo));
        $this->id_city = htmlspecialchars(strip_tags($this->id_city));
        if ($id_person != null){
            if ($this->password != null){
                $request = "UPDATE person SET password=:password WHERE id_person=:id_person;";
                $statement = $this->connection->prepare($request);
                $statement->bindParam(':password', password_hash($this->password,PASSWORD_DEFAULT), PDO::PARAM_STR, 1000);
                $statement->bindParam(':id_person', $id_person, PDO::PARAM_INT);
                $statement->execute();
            }
            if ($this->application_note != null){
                $request = "UPDATE person SET application_note=:application_note WHERE id_person=:id_person;";
                $statement = $this->connection->prepare($request);
                $statement->bindParam(':application_note', $this->application_note, PDO::PARAM_INT);
                $statement->bindParam(':id_person', $id_person, PDO::PARAM_INT);
                $statement->execute();
            }
            if ($this->age != null){
                $request = "UPDATE person SET age=:age WHERE id_person=:id_person;";
                $statement = $this->connection->prepare($request);
                $statement->bindParam(':age', $this->age, PDO::PARAM_INT);
                $statement->bindParam(':id_person', $id_person, PDO::PARAM_INT);
                $statement->execute();
            }
            if ($this->id_physical_form != null){
                $request = "UPDATE person SET id_physical_form=:id_physical_form WHERE id_person=:id_person;";
                $statement = $this->connection->prepare($request);
                $statement->bindParam(':id_physical_form', $this->id_physical_form, PDO::PARAM_INT);
                $statement->bindParam(':id_person', $id_person, PDO::PARAM_INT);
                $statement->execute();
            }
            $request = "UPDATE person SET id_photo=:id_photo, id_city=:id_city WHERE id_person=:id_person;";
            $statement = $this->connection->prepare($request);
            $statement->bindParam(':id_photo', $this->id_photo, PDO::PARAM_INT);
            $statement->bindParam(':id_city', $this->id_city, PDO::PARAM_INT);
            $statement->bindParam(':id_person', $id_person, PDO::PARAM_INT);
            $statement->execute();
            return true;
        }
    }

    /**
     * function checking the mail and password to connect the user
     * @param $email
     * @param $password
     * @return false|mixed
     */
    public function connection($email, $password){
        try {
            $request = "SELECT password, id_person FROM person WHERE email=:email;";
            $statement = $this->connection->prepare($request);
            $statement->bindParam(':email', $email, PDO::PARAM_STR, 200);
            $statement->execute();
            $res = $statement->fetchAll(PDO::FETCH_ASSOC);
            if (password_verify($password, $res[0]['password'])){
                $result = $res[0]['id_person'];
            }
        }
        catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
        return $result;
    }
}