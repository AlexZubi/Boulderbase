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
