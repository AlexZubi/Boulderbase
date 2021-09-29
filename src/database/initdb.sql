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
    boulder_id SERIAL PRIMARY KEY REFERENCES webscraped_boulder(boulder_id),
    name VARCHAR(100) UNIQUE,
    grade VARCHAR(6),
    area VARCHAR(20)
);