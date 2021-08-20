var Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "",
    database: "climbs",
    host: "localhost",
    port: 5432
});

module.exports = {pool};
