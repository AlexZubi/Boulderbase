import map from "lodash/map";
import getConnection from "./connectionPool";
import { PoolClient } from "pg";

/** This function scans the datebase for outdated data and updates it if necessary */
export function checkAndUpdateWebscrapedArea(): Promise<boolean> {
  console.log("Checking for necessary updates...");
  return getConnection().then((client) => {
    return checkIfDateOutdated(client).then((res) => {
      if (!(res.length > 0)) {
        client.release();
        return false;
      }
      updateSectionDates(res, client);
      client.release();
      return true;
    });
  });
}

function checkIfDateOutdated(client: PoolClient): Promise<number[]> {
  return client
    .query(
      "SELECT area_id FROM webscraped_area WHERE scraping_date < now() - '7 days' :: interval"
    )
    .then((res) => {
      return map(res.rows, "area_id");
    });
}

function updateSectionDates(sectionIds: number[], client: PoolClient): void {
  return sectionIds.forEach((sectionId) => {
    return client.query(
      "UPDATE webscraped_area SET scraping_date = now() WHERE area_id = ($1)",
      [sectionId]
    );
  });
}
