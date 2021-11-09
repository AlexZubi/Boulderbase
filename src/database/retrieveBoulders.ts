import { PoolClient, QueryResult } from "pg";

import { Boulder } from "../models/common";
import { retrieveSectionLink, saveBouldersForSection } from "./webscrape";

export default function retrieveBoulders(
  area: string, client: PoolClient
): Promise<Boulder[] | void> {

  return isAreaInDatabase(area, client)
    .then((retrievedArea) => {
      if (retrievedArea) {

        return saveBoulders(area, client);
      }

      return insertNewArea(area, client)
        .then(() => retrieveSectionLink(area))
        .then((link) => saveBouldersForSection(link, area, client))
        .then(() => {

          return saveBoulders(area, client);
        });
    })
    .catch((error) => console.error(error));
}

function saveBoulders(section: string, client: PoolClient): Promise<Boulder[]> {

  return client
    .query(
      "SELECT boulder_id, name, grade FROM webscraped_boulder WHERE area = ($1)",
      [section]
    )
    .then((boulder) => {

      return boulder.rows;
    });
}
function insertNewArea(
  section: string, client: PoolClient
): Promise<QueryResult> {

  return client.query(
    "INSERT INTO webscraped_area (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
    [section]
  );
}

function isAreaInDatabase(area: string, client: PoolClient): Promise<boolean> {

  
  return client
    .query("SELECT name from webscraped_area WHERE name = ($1)", [area])
    .then((retrievedArea) => {
      if (retrievedArea.rows.length !== 0) {

        return true;
      }
      
      return false;
    });
}
