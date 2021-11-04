import { PoolClient, QueryResult } from "pg";

import { Boulder } from "../models/common";

export async function insertUserBoulder(
  boulder_id: number, client: PoolClient
): Promise<QueryResult> {

  return client
    .query("SELECT boulder_id FROM user_boulder WHERE ($1) = boulder_id", [
      boulder_id,
    ])
    .then((boulderId) => {
      if (!(boulderId.rows.length === 0)) {
        console.error("Boulder already in userBoulder!");
      } else {
        
        return client.query(
          "INSERT INTO user_boulder VALUES ($1) RETURNING boulder_id",
          [boulder_id]
        );
      }
    });
}

export async function deleteUserBoulder(
  boulder_id: number, client: PoolClient
): Promise<QueryResult> {

  return client.query(
    "DELETE FROM user_boulder WHERE ($1) = boulder_id RETURNING boulder_id",
    [boulder_id]
  );
}
export async function retrieveUserBoulders(
  client: PoolClient
): Promise<Boulder[]> {

  return client
    .query(
      "SELECT boulder_id, name, grade, area FROM user_boulder JOIN webscraped_boulder USING (boulder_id)"
    )
    .then((boulder) => {

      return boulder.rows;
    });
}
