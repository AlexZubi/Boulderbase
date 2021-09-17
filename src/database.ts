const { Pool } = require("pg");

const pool = new Pool({
  connectionLimit: 10,
  user: "postgres",
  password: "",
  database: "climbs",
  host: "localhost",
  port: 5432,
  max: 20,
  debug: false
});
var getConnection = function (cb) {
  pool.connect(function (err, connection) {
    if (err) {
      return cb(err);
    }
    cb(err, connection);
  });
};
module.exports = getConnection;
