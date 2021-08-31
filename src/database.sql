CREATE DATABASE climbs;

\c climbs
--\c into climbs

CREATE TABLE boulders (
    boulder_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    grade VARCHAR(6)
);

-- Setzt die automatisch fortlaufende ID einer Tabelle auf 1 zurück.

/* SELECT setval(pg_get_serial_sequence('boulders', 'boulder_id')
	   , COALESCE(max(boulder_id) + 1, 1)
	   , false)
FROM boulders;