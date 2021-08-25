const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "",
    database: "climbs",
    host: "localhost",
    port: 5432
});

const client = pool.connect()

module.exports = {client};
