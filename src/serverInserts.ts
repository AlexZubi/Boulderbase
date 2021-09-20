import forEach from "lodash/forEach";
const getConnection = require("./database");
import { boulderType } from "./boulderType";

export function newScrapedSection(cragName: String) {
  //Saves the areas and date of the scraped section to a table. Date defaults to now()
  getConnection(function (err, client) {
    client.query(
      "INSERT INTO scraped (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
      [cragName]
    ).then(client.release());;
  })
}
export function existingScrapedSection(cragName: String) {
  //Updates the date of the section in the scraped table
  getConnection(function (err, client) {
    client.query("UPDATE scraped SET scraping_date = now() WHERE name = ($1)", [
      cragName,
    ]).then(client.release());;
  });
}
export function scrapedBoulders(boulders: boulderType[], area: String) {
  //Saves the boulders of the scraping to a table
    forEach(boulders, function (boulder: boulderType) {
      getConnection(function (err, client) {
      client.query(
        "INSERT INTO scrapedBoulders (name, grade, area) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING",
        [boulder.name, boulder.grade, area]
      ).then(client.release())
    });
  });
}
