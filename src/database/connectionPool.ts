import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "",
  database: "boulderbase",
  host: "localhost",
  port: 5432,
  max: 20,
});

export default () => pool.connect();