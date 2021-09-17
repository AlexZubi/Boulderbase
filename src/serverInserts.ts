import forEach from "lodash/forEach";
import { connection } from "./connection";
import { boulderType } from "./boulderType";

export function newScrapedSection(cragName: String) {
  //Saves the areas and date of the scraped section to a table. Date defaults to now()
  connection.query(
    "INSERT INTO scraped (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
    [cragName]
  );
}
export function existingScrapedSection(cragName: String) {
  //Updates the date of the section in the scraped table
  connection.query(
    "UPDATE scraped SET scraping_date = now() WHERE name = ($1)",
    [cragName]
  );
}
export function scrapedBoulders(boulders: boulderType[], area: String) {
  //Saves the boulders of the scraping to a table
  forEach(boulders, function (boulder: boulderType) {
    connection.query(
      "INSERT INTO scrapedBoulders (name, grade, area) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING",
      [boulder.name, boulder.grade, area]
    );
  });
}
