import map from "lodash/map";
import { BoulderType } from "./models/boulderType";

const getConnection = require("./database");

export async function addToDb(boulder: BoulderType): Promise<void> {
  //Adds the clicked boulder to the "boulders" database
  getConnection(function (err, client) {
    client
      .query("SELECT area FROM scrapedboulders WHERE name = ($1)", [
        boulder.name,
      ])
      .then((res) => {
        let area = map(res.rows, "area");
        boulder.area = area[0];
      })
      .then(() =>
        client.query(
          "INSERT INTO boulders (name, grade, area) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING",
          [boulder.name, boulder.grade, boulder.area]
        )
      )
      .then(client.release());
  });
}
export async function deleteFromDb(boulder: BoulderType): Promise<void> {
  //Deletes the supplied boulder from the "boulders" database
  getConnection(function (err, client) {
    client
      .query("DELETE FROM boulders WHERE (name, grade, area) = ($1, $2, $3)", [
        boulder.name,
        boulder.grade,
        boulder.area,
      ])
      .then(client.release());
  });
}
export async function getFromDb(): Promise<void> {
  //Gets all boulder from the "boulders" database
  return new Promise((resolve, reject) => {
    getConnection(function (err, client) {
      client
        .query("SELECT name, grade, area FROM boulders")
        .then((res) => resolve(res.rows))
        .then(client.release());
    });
  });
}
