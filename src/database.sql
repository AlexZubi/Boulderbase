CREATE DATABASE climbs;

--\c into climbs

CREATE TABLE boulders (
    boulder_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    grade VARCHAR(6)
);

