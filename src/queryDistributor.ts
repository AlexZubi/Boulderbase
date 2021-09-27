import { getSection, getBoulderNames } from "./webscrape";
import { BoulderType } from "./models/boulderType";

const getConnection = require("./database");

export default async function queryDistributor(
  cragName: string,
  supplyResult: (data: BoulderType[]) => void
): Promise<void> {
  //Does an initial nameCheck resulting in the type of query and hands it to the respective function
  function checkName(cragName: string, outdatedSections: Function) {
    if (cragName != null) {
      getConnection(function (err, client): void {
        client
          .query("SELECT name from scraped WHERE name = ($1)", [cragName])
          .then((res) => outdatedSections(res))
          .then(client.release());
      });
    }
  }

  checkName(cragName, async function (data: HTMLTableElement): Promise<void> {
    if (Object.keys(data.rows).length === 0) {
      //If name wasn't in the "scraped" database
      supplyResult(await newQuery(cragName));
    } else {
      //If name was in the "scraped" database
      reapeatingQuery(cragName, function (data: BoulderType[]): void {
        supplyResult(data);
      });
    }
  });
}

function newQuery(cragName: string): Promise<BoulderType[]> {
  //Handles a query which supplied a name that is not present in the "scraped" database
  return webscrape(cragName);
}

function reapeatingQuery(cragName: string, supplyQueryResult: Function): void {
  //Handles a query which supplied a name that is already present in the "scraped" database
  getConnection(function (err, client): void {
    client
      .query("SELECT name, grade FROM scrapedBoulders WHERE area = ($1)", [
        cragName,
      ])
      .then((res) => {
        supplyQueryResult(res.rows);
      })
      .then(client.release());
  });
}

export async function webscrape(cragName: string): Promise<BoulderType[]> {
  const getArea = await getSection(cragName);
  const getBoulder = await getBoulderNames(getArea);
  return getBoulder;
}
