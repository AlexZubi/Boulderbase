CREATE DATABASE boulderbase;

\c boulderbase

-- Table to store past search requests with their respective date
CREATE TABLE webscraped_area (
    area_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    scraping_date DATE NOT NULL DEFAULT now()
);

-- Table to store the results of past search requests
CREATE TABLE webscraped_boulder (
    boulder_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    grade VARCHAR(6),
    area VARCHAR(20)
);

-- Table to store boulders added by user
CREATE TABLE user_boulder (
    boulder_id INTEGER PRIMARY KEY,
    CONSTRAINT boulder_id FOREIGN KEY (boulder_id) REFERENCES webscraped_boulder(boulder_id)
);


/*
"SELECT name, grade, area FROM user_boulder JOIN webscraped_boulder USING (boulder_id)"

INSERT INTO user_boulder VALUES ((SELECT boulder_id FROM webscraped_boulder WHERE name = 'Tenor'));

"DELETE FROM user_boulder WHERE (name, grade, area) = ($1, $2, $3)",

"DELETE FROM user_boulder WHERE ((SELECT boulder_id FROM webscraped_boulder WHERE name = 'Tenor')) = boulder_id;",

*/