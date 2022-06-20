------------------------------------------------------------
--        Script Postgre 
------------------------------------------------------------



------------------------------------------------------------
-- Table: city
------------------------------------------------------------
CREATE TABLE public.city(
	id_city    SERIAL NOT NULL ,
	name       VARCHAR (200) NOT NULL ,
	zipcode   INT  NOT NULL  ,
	CONSTRAINT city_PK PRIMARY KEY (id_city)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: photo
------------------------------------------------------------
CREATE TABLE public.photo(
	id_photo   SERIAL NOT NULL ,
	path       VARCHAR (1000) NOT NULL  ,
	CONSTRAINT photo_PK PRIMARY KEY (id_photo)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: sport
------------------------------------------------------------
CREATE TABLE public.sport(
	id_sport   SERIAL NOT NULL ,
	name       VARCHAR (200) NOT NULL  ,
	nb_max     INT NOT NULL ,
	id_photo   INT NOT NULL ,
	CONSTRAINT sport_PK PRIMARY KEY (id_sport)
    ,CONSTRAINT sport_photo_FK FOREIGN KEY (id_photo) REFERENCES public.photo(id_photo)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: physical_form
------------------------------------------------------------
CREATE TABLE public.physical_form(
	id_physical_form   SERIAL NOT NULL ,
	name               VARCHAR (200) NOT NULL  ,
	CONSTRAINT physical_form_PK PRIMARY KEY (id_physical_form)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: person
------------------------------------------------------------
CREATE TABLE public.person(
	id_person          SERIAL NOT NULL ,
	first_name         VARCHAR (200) NOT NULL ,
	name               VARCHAR (200) NOT NULL ,
	email              VARCHAR (200) NOT NULL ,
	password           VARCHAR (1000) NOT NULL ,
	goal_nb            INT  NOT NULL ,
	age                INT   ,
	id_photo           INT  NOT NULL ,
	id_city            INT  NOT NULL ,
	id_physical_form   INT    ,
	CONSTRAINT person_PK PRIMARY KEY (id_person)

	,CONSTRAINT person_photo_FK FOREIGN KEY (id_photo) REFERENCES public.photo(id_photo)
	,CONSTRAINT person_city0_FK FOREIGN KEY (id_city) REFERENCES public.city(id_city)
	,CONSTRAINT person_physical_form1_FK FOREIGN KEY (id_physical_form) REFERENCES public.physical_form(id_physical_form)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: match
------------------------------------------------------------
CREATE TABLE public.match(
	id_match        SERIAL NOT NULL ,
	address         VARCHAR (200) NOT NULL ,
	date_time       DATE  NOT NULL ,
	price           INT NOT NULL ,
	score           VARCHAR (50)  ,
	id_person       INT  NOT NULL ,
	id_sport        INT  NOT NULL ,
	id_city         INT  NOT NULL  ,
	CONSTRAINT match_PK PRIMARY KEY (id_match)

	,CONSTRAINT match_person_FK FOREIGN KEY (id_person) REFERENCES public.person(id_person)
	,CONSTRAINT match_sport0_FK FOREIGN KEY (id_sport) REFERENCES public.sport(id_sport)
	,CONSTRAINT match_city1_FK FOREIGN KEY (id_city) REFERENCES public.city(id_city)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: player_match
------------------------------------------------------------
CREATE TABLE public.player_match(
	id_match      INT  NOT NULL ,
	id_person     INT  NOT NULL ,
	nb_goal       INT   ,
	best_player   BOOL   ,
	accept        BOOL  NOT NULL  ,
	CONSTRAINT player_match_PK PRIMARY KEY (id_match,id_person)

	,CONSTRAINT player_match_match_FK FOREIGN KEY (id_match) REFERENCES public.match(id_match)
	,CONSTRAINT player_match_person0_FK FOREIGN KEY (id_person) REFERENCES public.person(id_person)
)WITHOUT OIDS;



