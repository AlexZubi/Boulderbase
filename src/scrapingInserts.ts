import forEach from "lodash/forEach";
import { BoulderType } from "./models/boulderType";
import getConnection from "./database/initConnection";

export function newScrapedSection(cragName: string): Promise<void> {
  //Saves the areas and date of the scraped section to the "scraped" table. Date defaults to now()
  return getConnection().then((client) => {
    client
      .query(
        "INSERT INTO webscraped_area (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
        [cragName]
      )
      .then(() => client.release());
  });
}
export function existingScrapedSection(cragName: string): Promise<void> {
  //Updates the date of the section in the "scraped" database
  return getConnection().then((client) => {
    client
      .query(
        "UPDATE webscraped_area SET scraping_date = now() WHERE name = ($1)",
        [cragName]
      )
      .then(() => client.release());
  });
}
export function scrapedBoulders(boulders: BoulderType[], area: string): void {
  //Saves the boulders of the scraping to the "scrapedBoulders" database
  forEach(boulders, function (boulder: BoulderType): Promise<void> {
    return getConnection().then((client) => {
      client
        .query(
          "INSERT INTO webscraped_boulder (name, grade, area) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING",
          [boulder.name, boulder.grade, area]
        )
        .then(() => client.release());
    });
  });
}
