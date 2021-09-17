import { connection } from "./connection";
import { getSection, getBoulderNames } from "./webscrape";

export default async function queryDistributor(
  cragName: string,
  supplyResult: Function
): Promise<any> {
  //Does an initial nameCheck resulting in the type of query and hands it to the respective function
  function checkName(cragName: string, outdatedSections: Function) {
    if (cragName != null) {
      connection
        .query("SELECT name from scraped WHERE name = ($1)", [cragName])
        .then((res) => outdatedSections(res));
    }
  }
  checkName(cragName, async function (data) {
    if (Object.keys(data.rows).length === 0) {
      //If name wasn't in the table
      supplyResult(await newQuery(cragName));
    } else {
      //If name was in the table
      reapeatingQuery(cragName, function (data) {
        supplyResult(data);
      });
    }
  });
}

function newQuery(cragName: string): Promise<any> {
  //Handles a query which supplied a name that is not present in the "scraped"-table
  return webscrape(cragName);
}

function reapeatingQuery(cragName: string, supplyQueryResult: Function) {
  //Handles a query which supplied a name that is already present in the "scraped"-table
  function queryRepetition() {
    connection
      .query("SELECT name, grade FROM scrapedBoulders WHERE area = ($1)", [
        cragName,
      ])
      .then((res) => {
        supplyQueryResult(res.rows);
      });
  }
  queryRepetition();
}

export async function webscrape(cragName: string) {
  const getArea = await getSection(cragName);
  const getBoulder = await getBoulderNames(getArea);
  return getBoulder;
}
