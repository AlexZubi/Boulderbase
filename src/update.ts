const { client } = require("./database");
import forEach from "lodash/forEach";
import map from "lodash/map";
import { existingScrapedSection, scrapedBoulders } from "./serverInserts";
import { webscrape } from "./queryDistributor";
let clientImp: any;
client.then((data: any) => (clientImp = data));

export function update() {
  //Function to update the database automatically once the server starts
  console.log("Updating data...");
  function checkOutdated() {
    return clientImp
      .query(
        "SELECT name FROM scraped WHERE scraping_date < now() - '7 days' :: interval"
      )
      .then((data) => data.rows);
  }
  function updateDatabase(outdatedValues: any) {
    let areas = map(outdatedValues, "name");
    forEach(areas, function (area: any) {
      existingScrapedSection(area);
      webscrape(area).then((boulders) => scrapedBoulders(boulders, area));
    });
  }
  checkOutdated().then((areas: any) => updateDatabase(areas));
}
