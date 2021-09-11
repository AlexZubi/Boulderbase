const { client } = require("./database");
import forEach from "lodash/forEach";
let clientImp;
client.then((data: any) => (clientImp = data));

export function newScrapedSection(cragName: string) {
  //Saves the areas and date of the scraped section to a table
  try {
    clientImp.query(
      "INSERT INTO scraped (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
      [cragName]
    );
  } catch (err) {
    console.log(err);
  }
}
export function existingScrapedSection(cragName: string) {
  //Updates the date of the section in the scraped table
  try {
    clientImp.query(
      "UPDATE scraped SET scraping_date = now() WHERE name = ($1)",
      [cragName]
    );
  } catch (err) {
    console.log(err);
  }
}
export function scrapedBoulders(boulders: any, area: String) {
  //Saves the boulders of the scraping to a table
  forEach(boulders, function (boulder: any) {
    clientImp.query(
      "INSERT INTO scrapedBoulders (name, grade, area) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING",
      [boulder.name, boulder.grade, area]
    );
  });
}
