import { retrieveSectionLink, saveBouldersForSection } from "./webscrape";
import getConnection from "./connectionPool";
import { PoolClient, QueryResult } from "pg";
import { Boulder } from "../models/common";

export default function retrieveBoulders(section: string): Promise<Boulder[]> {
  return getConnection().then((client) => {
    return isAreainTable(section, client).then((area) => {
      if (!(area.rows.length === 0)) {
        return saveAndRetrieveBouldersFromTable(section, client);
      }
      return insertNewArea(section, client)
        .then(() => retrieveSectionLink(section))
        .then((link) => saveBouldersForSection(link, section, client))
        .then(() => {
          return saveAndRetrieveBouldersFromTable(section, client);
        });
    });
  });
}

function saveAndRetrieveBouldersFromTable(
  section: string,
  client: PoolClient
): Promise<Boulder[]> {
  return client
    .query(
      "SELECT boulder_id, name, grade FROM webscraped_boulder WHERE area = ($1)",
      [section]
    )
    .then((res) => {
      client.release();
      return res.rows;
    });
}
function insertNewArea(
  section: string,
  client: PoolClient
): Promise<QueryResult> {
  return client.query(
    "INSERT INTO webscraped_area (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
    [section]
  );
}

function isAreainTable(
  section: string,
  client: PoolClient
): Promise<QueryResult> {
  if (!(section != null)) {
    return;
  }
  return client
    .query("SELECT name from webscraped_area WHERE name = ($1)", [section])
    .then((res) => {
      return res;
    });
}
