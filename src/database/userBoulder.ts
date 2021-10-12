import { PoolClient } from "pg";
import { Boulder } from "../models/common";

export async function insertUserBoulder(
  boulder_id: number,
  client: PoolClient
): Promise<void> {
  client
    .query("SELECT boulder_id FROM user_boulder WHERE ($1) = boulder_id", [
      boulder_id,
    ])
    .then((res) => {
      if (!(res.rows.length === 0)) {
        console.error("Boulder already in userBoulder!");
      }
      client.query(
        "INSERT INTO user_boulder VALUES ($1)",
        [boulder_id]
      );
    });
}

export async function deleteUserBoulder(
  boulder_id: number,
  client: PoolClient
): Promise<void> {
  client.query("DELETE FROM user_boulder WHERE ($1) = boulder_id;", [
    boulder_id,
  ]);
}
export async function retrieveUserBoulders(
  client: PoolClient
): Promise<Boulder[]> {
  return client
    .query(
      "SELECT boulder_id, name, grade, area FROM user_boulder JOIN webscraped_boulder USING (boulder_id)"
    )
    .then((res) => {
      return res.rows;
    });
}
