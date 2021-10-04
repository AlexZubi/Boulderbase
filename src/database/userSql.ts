import { BoulderType } from "../models/boulderType";
import getConnection from "../database/connectionPool";

export async function addToDb(boulder: BoulderType): Promise<void> {
  //Adds the clicked boulder to the "boulders" database
  getConnection().then((client) => {
    client
      .query(
        "INSERT INTO user_boulder VALUES ($1) ON CONFLICT (boulder_id) DO NOTHING",
        [boulder.boulder_id]
      )
      .then(() => client.release());
  });
}

export async function deleteFromDb(boulder: BoulderType): Promise<void> {
  //Deletes the supplied boulder from the "boulders" database
  getConnection().then((client) => {
    return client
      .query(
        "DELETE FROM user_boulder WHERE ($1) = boulder_id;",
        [boulder.boulder_id]
      )
      .then(() => client.release());
  });
}
export async function getFromDb(): Promise<BoulderType[]> {
  //Gets all boulder from the "boulders" database
  return getConnection().then((client) => {
    return client
      .query(
        "SELECT boulder_id, name, grade, area FROM user_boulder JOIN webscraped_boulder USING (boulder_id)"
      )
      .then((res) => {
        client.release();
        return res.rows;
      });
  });
}
