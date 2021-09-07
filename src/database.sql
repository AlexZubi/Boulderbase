-- User Database
CREATE DATABASE climbs;

--\c into climbs
\c climbs

-- Table to store climbs added by user
CREATE TABLE boulders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    grade VARCHAR(6),
    area VARCHAR(20)
);

DELETE FROM boulders WHERE boulder_id > 0;

-- "FRONTEND" Table
--Table to store past scrapes with their respective date
CREATE TABLE scraped (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    scraping_date DATE NOT NULL DEFAULT now()
);

-- "BACKEND" Table
--Table to store the results of past scrapes
CREATE TABLE scrapedBoulders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    grade VARCHAR(6),
    area VARCHAR(20)
);

CREATE TABLE test (
    name VARCHAR(30),
    date date NOT NULL DEFAULT CURRENT_DATE
);



-- Setzt die automatisch fortlaufende ID einer Tabelle auf 1 zurück.

/* SELECT setval(pg_get_serial_sequence('boulders', 'boulder_id')
	   , COALESCE(max(boulder_id) + 1, 1)
	   , false)
FROM boulders;


 for(var key in zulu) {
          for(var innerKey in zulu[key]) {
            console.log("Key: " + innerKey + " value: " + zulu[key][innerKey]);
         }      
      }
