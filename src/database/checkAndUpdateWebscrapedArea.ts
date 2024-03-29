import map from "lodash/map";
import { PoolClient } from "pg";

/** This function scans the datebase for outdated data and updates it if necessary */
export function checkAndUpdateWebscrapedArea(
  client: PoolClient
): Promise<boolean | void> {
  console.log("Checking for necessary updates...");

  return retrieveOutdatedAreaIds(client)
    .then((areaIds) => {
      if (!(areaIds.length > 0)) {
        
        return false;
      }
      updateSectionDates(areaIds, client);

      return true;
    })
    .catch((error) => console.error(error));
}

function retrieveOutdatedAreaIds(client: PoolClient): Promise<number[]> {

  return client
    .query(
      "SELECT area_id FROM webscraped_area WHERE scraping_date < now() - '7 days' :: interval"
    )
    .then((areaIds) => map(areaIds.rows, "area_id"));
}

function updateSectionDates(sectionIds: number[], client: PoolClient) {

  return client.query(
    "UPDATE webscraped_area SET scraping_date = now() WHERE area_id = ($1) RETURNING area_id",
    [sectionIds.join("")]
  );
}
