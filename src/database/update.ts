import forEach from "lodash/forEach";
import map from "lodash/map";
import { existingScrapedSection, scrapedBoulders } from "./scrapingInserts";
import { webscrape } from "./queryDistributor";
import getConnection from "../database/connectionPool";

export function update(): Promise<void> {
  //Function to update the database automatically once the server starts
  console.log("Updating data...");
  return getConnection().then((client) => {
    function checkOutdated(outDatedSections: (res: object[]) => void) {
      client
        .query(
          "SELECT name FROM webscraped_area WHERE scraping_date < now() - '7 days' :: interval"
        )
        .then((res) => {
          client.release();
          outDatedSections(res.rows);
        });
    }
    function updateDatabase(outdatedValues: object[]): void {
      const areas = map(outdatedValues, "name");
      forEach(areas, function (area: string): void {
        existingScrapedSection(area);
        webscrape(area).then((boulders) => scrapedBoulders(boulders, area));
      });
    }
    return checkOutdated(updateDatabase);
  });
}
