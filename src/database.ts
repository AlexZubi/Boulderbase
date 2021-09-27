import { Pool, PoolClient } from "pg"

const pool = new Pool({
  user: "postgres",
  password: "",
  database: "climbs",
  host: "localhost",
  port: 5432,
  max: 20,
});

type Callback = (err: Error, client?: PoolClient) => void;

var getConnection = function (cb: Callback ) {
  pool.connect(function (err, connection) {
    if (err) {
      return cb(err);
    }
    cb(err, connection);
  });
};
module.exports = getConnection;
