import map from "lodash/map";
import { BoulderType } from "./models/boulderType";
import getConnection from "./database/initConnection";

export async function addToDb(boulder: BoulderType): Promise<void> {
  //Adds the clicked boulder to the "boulders" database
  getConnection().then((client) => {
    client
      .query("SELECT area FROM webscraped_boulder WHERE name = ($1)", [
        boulder.name,
      ])
      .then((res) => {
        let area = map(res.rows, "area");
        boulder.area = area[0];
      })
      .then(() =>
        client.query(
          "INSERT INTO user_boulder (name, grade, area) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING",
          [boulder.name, boulder.grade, boulder.area]
        )
      )
      .then(() => client.release());
  });
}

export async function deleteFromDb(boulder: BoulderType): Promise<void> {
  //Deletes the supplied boulder from the "boulders" database
  getConnection().then((client) => {
    return client
      .query(
        "DELETE FROM user_boulder WHERE (name, grade, area) = ($1, $2, $3)",
        [boulder.name, boulder.grade, boulder.area]
      )
      .then(() => client.release());
  });
}
export async function getFromDb(): Promise<BoulderType[]> {
  //Gets all boulder from the "boulders" database
  return getConnection().then((client) => {
    return client
      .query("SELECT name, grade, area FROM user_boulder")
      .then((res) => {
        client.release();
        return res.rows;
      });
  });
}
