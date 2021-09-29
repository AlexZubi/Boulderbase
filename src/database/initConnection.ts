import { pool } from "./connectionPool"

var getConnection = function ( ) {
  return pool.connect()
}

export default getConnection;