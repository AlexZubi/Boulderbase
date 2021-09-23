const getConnection = require("./database");
import forEach from "lodash/forEach";
import map from "lodash/map";
import { existingScrapedSection, scrapedBoulders } from "./scrapingInserts";
import { webscrape } from "./queryDistributor";

export function update() {
  //Function to update the database automatically once the server starts
  console.log("Updating data...");
  getConnection(function (err, client) {
    function checkOutdated(outDatedSections: Function) {
      client
        .query(
          "SELECT name FROM scraped WHERE scraping_date < now() - '7 days' :: interval"
        )
        .then((res) => {
          outDatedSections(res.rows);
        });
    }
    function updateDatabase(outdatedValues) {
      const areas = map(outdatedValues, "name");
      forEach(areas, function (area: string) {
        existingScrapedSection(area);
        webscrape(area)
          .then((boulders) => scrapedBoulders(boulders, area))
          .then(() => client.release());
      });
    }
    checkOutdated(updateDatabase);
  });
}
