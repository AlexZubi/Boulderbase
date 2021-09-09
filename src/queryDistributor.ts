const { client } = require("./database");
import {
  newScrapedSection,
  existingScrapedSection,
  scrapedBoulders,
} from "./serverInserts";
import { getSection, getBoulderNames } from "./webscrape";
import map from "lodash/map";
import forEach from "lodash/forEach";
let clientImp: any;
client.then((data: any) => (clientImp = data));

export default async function queryDistributor(cragName: string): Promise<any> {
  //Does an initial nameCheck resulting in the type of query and hands it to the respective function
  function checkName(cragName: string) {
    if (cragName != null) {
      return clientImp.query("SELECT name from scraped WHERE name = ($1)", [
        cragName,
      ]);
    }
  }
  function distribute(data: any) {
    if (Object.keys(data.rows).length === 0) {
      //If name wasn't in the table
      return newQuery(cragName);
    } else {
      //If name was in the table
      return reapeatingQuery(cragName);
    }
  }
  return checkName(cragName).then((res) => distribute(res));
}

function newQuery(cragName: string): Promise<any> {
  //Handles a query which supplied a name that is not present in the "scraped"-table
  newScrapedSection(cragName);
  return webscrape(cragName);
}

async function reapeatingQuery(cragName: string): Promise<any> {
  //Handles a query which supplied a name that is already present in the "scraped"-table
  return clientImp
    .query("SELECT name, grade, area FROM scrapedBoulders WHERE area = ($1)", [
      cragName,
    ])
    .then((data) => data.rows);
}

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

export async function webscrape(cragName: string) {
  const getArea = await getSection(cragName);
  const getBoulder = await getBoulderNames(getArea);
  return getBoulder;
}
