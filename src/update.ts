const getConnection = require("./database");
import forEach from "lodash/forEach";
import map from "lodash/map";
import { existingScrapedSection, scrapedBoulders } from "./serverInserts";
import { webscrape } from "./queryDistributor";

export function update() {
  //Function to update the database automatically once the server starts
  let connection = null;
  console.log("Updating data...");
  function checkOutdated(outDatedSections: Function) {
    getConnection(function (err, con) {
      connection = con;
      connection
        .query(
          "SELECT name FROM scraped WHERE scraping_date < now() - '7 days' :: interval"
        )
        .then((res) => {
          outDatedSections(res.rows);
        });
    });
  }
  function updateDatabase(outdatedValues) {
    const areas = map(outdatedValues, "name");
    forEach(areas, function (area: string) {
      existingScrapedSection(area);
      webscrape(area)
        .then((boulders) => scrapedBoulders(boulders, area))
        .then(() => connection.end());
    });
  }
  checkOutdated(updateDatabase);
}
