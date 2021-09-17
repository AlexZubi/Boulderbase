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

/*
SELECT setval(pg_get_serial_sequence('boulders', 'id')
	   , COALESCE(max(id) + 1, 1)
	   , false)
FROM boulders;

SELECT setval(pg_get_serial_sequence('scrapedBoulders', 'id')
	   , COALESCE(max(id) + 1, 1)
	   , false)
FROM scrapedBoulders;

SELECT setval(pg_get_serial_sequence('scraped', 'id')
	   , COALESCE(max(id) + 1, 1)
	   , false)
FROM scraped;

 for(var key in zulu) {
          for(var innerKey in zulu[key]) {
            console.log("Key: " + innerKey + " value: " + zulu[key][innerKey]);
         }      
      }
*/
