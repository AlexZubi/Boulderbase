import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "",
  database: "boulderbase",
  host: "localhost",
  port: 5432,
  max: 20,
});

var getConnection = function ( ) {
  return pool.connect()
}

export default getConnection;