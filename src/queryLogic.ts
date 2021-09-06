const { client } = require("./database");
import { scrapedSection, scrapedBoulders } from "./serverInserts";
import { getSection, getBoulderNames, getSections } from "./webscrape";
import { toTableFormBoulders, toTableFormArea } from "./toTableForm";
let clientImp;
client.then((data) => (clientImp = data));

export default function queryDistributor(cragName: string) {
  //Does an initial nameCheck resulting in the type of query and hands it to the respective function

  async function checkName(cragName: any) {
    const nameQuery = await clientImp.query(
      "SELECT name from scraped WHERE name = ($1)",
      [cragName]
    );
    return nameQuery;
  }
  checkName(cragName).then((res) => distribute(res));

  function distribute(data) {
    var json = data.rows;
    if (Object.keys(json).length === 0) {
      newQuery(cragName);
    } else {
      reapeatingQuery(cragName);
    }
  }
}

function newQuery(cragName: string) {
  //Handles a query which supplied a name that is not present in the database

  //1. save area
  scrapedSection(cragName);
  //2. webscrape
  async function scrapeBoulders(cragName) {
    const getArea = await getSection(cragName);
    const getBoulder = await getBoulderNames(getArea);
    const tableForm = toTableFormBoulders(getBoulder);

    return tableForm;
  }
  //3. supply data
  scrapedBoulders(scrapeBoulders(cragName));
  return scrapeBoulders(cragName);
}

function reapeatingQuery(cragName: string) {
  //Handles a query which supplied a name that is present in the database
  //SELECT name, scraping_date FROM scraped WHERE name = 'Sudelfeld'  AND  scraping_date < now() - '12 hours' :: interval;
  //If YES
  //1. Supply Data
  //2. webscrape
  //3. Save Data
  //(done by other function?!)
  //If NO
  //1. Supply data
}
