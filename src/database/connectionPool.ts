import { Pool } from "pg";

const pool = new Pool({
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  host: process.env.host,
  port: parseInt(process.env.port)

});

export default () => pool.connect();