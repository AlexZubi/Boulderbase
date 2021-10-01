import { getSection, getBoulderNames } from "./webscrape";
import { BoulderType } from "../models/boulderType";
import getConnection from "../database/connectionPool";
import { QueryResult } from "pg";

export default async function queryDistributor(
  cragName: string,
  supplyResult: (data: BoulderType[]) => void
): Promise<void> {
  //Does an initial nameCheck resulting in the type of query and hands it to the respective function
  function checkName(
    cragName: string,
    outdatedSections: (res: QueryResult<HTMLTableElement>) => Promise<void>
  ): Promise<void> {
    if (cragName != null) {
      return getConnection().then((client) => {
        client
          .query("SELECT name from webscraped_area WHERE name = ($1)", [
            cragName,
          ])
          .then((res) => {
            client.release();
            outdatedSections(res);
          });
      });
    }
  }

  checkName(
    cragName,
    async function (data: QueryResult<HTMLTableElement>): Promise<void> {
      if (Object.keys(data.rows).length === 0) {
        //If name wasn't in the "scraped" database
        supplyResult(await newQuery(cragName));
      } else {
        //If name was in the "scraped" database
        reapeatingQuery(cragName, function (data: BoulderType[]): void {
          supplyResult(data);
        });
      }
    }
  );
}

function newQuery(cragName: string): Promise<BoulderType[]> {
  //Handles a query which supplied a name that is not present in the "scraped" database
  return webscrape(cragName);
}

function reapeatingQuery(
  cragName: string,
  supplyQueryResult: (res: BoulderType[]) => void
): Promise<void> {
  //Handles a query which supplied a name that is already present in the "scraped" database
  return getConnection().then((client) => {
    client
      .query("SELECT name, grade FROM webscraped_boulder WHERE area = ($1)", [
        cragName,
      ])
      .then((res) => {
        client.release();
        supplyQueryResult(res.rows);
      });
  });
}

export async function webscrape(cragName: string): Promise<BoulderType[]> {
  const getArea = await getSection(cragName);
  const getBoulder = await getBoulderNames(getArea);
  return getBoulder;
}
