const { client } = require("./database");
import { newScrapedSection } from "./serverInserts";
import { getSection, getBoulderNames } from "./webscrape";
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
  return checkName(cragName).then((res: any) => distribute(res));
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
    .then((data: any) => data.rows);
}

export async function webscrape(cragName: string) {
  try {
    const getArea = await getSection(cragName);
    const getBoulder = await getBoulderNames(getArea);
    return getBoulder;
  } catch (err) {
    console.log(err);
  }
}
