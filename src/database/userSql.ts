import { BoulderType } from "../models/boulderType";
import getConnection from "../database/connectionPool";

export async function addToDb(boulder: BoulderType): Promise<void> {
  //Adds the clicked boulder to the "boulders" database
  getConnection().then((client) => {
    client
      .query(
        "INSERT INTO user_boulder VALUES" +
          "((SELECT boulder_id FROM webscraped_boulder WHERE name = ($1))) ON CONFLICT (boulder_id) DO NOTHING",
        [boulder.name]
      )
      .then(() => client.release());
  });
}

export async function deleteFromDb(boulder: BoulderType): Promise<void> {
  //Deletes the supplied boulder from the "boulders" database
  getConnection().then((client) => {
    return client
      .query(
        "DELETE FROM user_boulder WHERE " +
          "((SELECT boulder_id FROM webscraped_boulder WHERE (name, grade,area) = ($1, $2, $3))) = boulder_id;",
        [boulder.name, boulder.grade, boulder.area]
      )
      .then(() => client.release());
  });
}
export async function getFromDb(): Promise<BoulderType[]> {
  //Gets all boulder from the "boulders" database
  return getConnection().then((client) => {
    return client
      .query(
        "SELECT name, grade, area FROM user_boulder JOIN webscraped_boulder USING (boulder_id)"
      )
      .then((res) => {
        client.release();
        return res.rows;
      });
  });
}
