const { client } = require("./database");
import {
  newScrapedSection,
  existingScrapedSection,
  scrapedBoulders,
} from "./serverInserts";
import { getSection, getBoulderNames } from "./webscrape";
import { toTableFormBoulders } from "./toTableForm";
let clientImp;
client.then((data) => (clientImp = data));

export default function queryDistributor(cragName: string): Promise<any> {
  //Does an initial nameCheck resulting in the type of query and hands it to the respective function

  async function checkName(cragName: string) {
    const nameQuery = await clientImp.query(
      "SELECT name from scraped WHERE name = ($1)",
      [cragName]
    );
    return nameQuery;
  }
  function distribute(data: any) {
    if (Object.keys(data.rows).length === 0) {
      //If name wasn't in the table
      const boulders = newQuery(cragName);
      return boulders;
    } else {
      //If name was in the table
      const boulders = reapeatingQuery(cragName);
      return boulders;
    }
  }
  const boulders = checkName(cragName).then((res) => distribute(res));
  return boulders;
}

async function newQuery(cragName: string): Promise<any> {
  //Handles a query which supplied a name that is not present in the "scraped"-table
  newScrapedSection(cragName);
  return webscrape(cragName);
}

async function reapeatingQuery(cragName: string): Promise<any> {
  //Handles a query which supplied a name that is already present in the "scraped"-table
  async function checkName(cragName: string) {
    const nameQuery = await clientImp.query(
      "SELECT name, scraping_date FROM scraped WHERE name = ($1) AND scraping_date < now() - '7 days' :: interval",
      [cragName]
    );
    return nameQuery;
  }
  function getBoulders(dateCheck: any) {
    const nameQuery = clientImp.query(
      "SELECT name, grade, area FROM scrapedBoulders WHERE area = ($1)",
      [cragName]
    );
    if (dateCheck.rows.length === 0) {
      //If date in table is younger than one week
      return nameQuery;
    } else {
      //If date in table is older than one week
      update(cragName);
      return nameQuery;
    }
  }
  const boulders = await checkName(cragName).then((data) => getBoulders(data));
  return boulders.rows;
}
async function webscrape(cragName: string) {
  const getBoulders = async (cragName: string) => {
    const getArea = await getSection(cragName);
    const getBoulder = await getBoulderNames(getArea);
    const tableForm = toTableFormBoulders(getBoulder);
    return tableForm;
  };
  const boulders = await getBoulders(cragName);
  return boulders;
}

function update(cragName: string) {
  //Function to update the date in "scraped"-table and the boulders in the "scrapedBoulders"-table of the last query
  async function scrapeBoulders(cragName: string) {
    const boulders = webscrape(cragName);
    return boulders;
  }
  existingScrapedSection(cragName);
  scrapeBoulders(cragName).then((data) => scrapedBoulders(data));
}
