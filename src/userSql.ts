const getConnection = require("./database");
import map from "lodash/map";
import { boulderType } from "./boulderType";

export async function addToDbSingle(boulder: boulderType) {
  //Adds the clicked boulder to the "so-far climbed"-database
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
export async function getFromDb() {
  //Gets all boulder from the "so-far climbed"-database
  return new Promise((resolve, reject) => {
    getConnection(function (err, client) {
      client
        .query("SELECT name, grade, area FROM boulders")
        .then((res) => resolve(res.rows))
        .then(client.release());
    });
  });
}
