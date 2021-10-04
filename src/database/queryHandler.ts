import { getSection, getBoulderNames } from "./webscrape";
import { BoulderType } from "../models/boulderType";
import getConnection from "./connectionPool";
import { QueryResult } from "pg";

export default async function distributeQuery(
  cragName: string,
  supplyResult: (data: BoulderType[]) => void
): Promise<void> {
  //Does an initial nameCheck resulting in the type of query and hands it to the respective function
  function checkName(
    cragName: string,
    checkedName: (res: QueryResult<HTMLTableElement>) => Promise<void>
  ): Promise<void> {
    if (cragName != null) {
      return getConnection().then((client) => {
        client
          .query("SELECT name from webscraped_area WHERE name = ($1)", [
            cragName,
          ])
          .then((res) => {
            client.release();
            checkedName(res);
          });
      });
    }
  }

  checkName(
    cragName,
    async function (data: QueryResult<HTMLTableElement>): Promise<void> {
      if (Object.keys(data.rows).length === 0) {
        //If name wasn't in the "webscraped_area" table
        const getArea = await getSection(cragName);
        await getBoulderNames(getArea).then(() => {
          handleQuery(cragName, function (data: BoulderType[]): void {
            supplyResult(data);
          });
        });
      } else {
        //If name was in the "webscraped_area" table
        handleQuery(cragName, function (data: BoulderType[]): void {
          supplyResult(data);
        });
      }
    }
  );
}

async function handleQuery(
  cragName: string,
  supplyQueryResult: (res: BoulderType[]) => void
): Promise<void> {
  return getConnection().then((client) => {
    client
      .query(
        "SELECT boulder_id, name, grade FROM webscraped_boulder WHERE area = ($1)",
        [cragName]
      )
      .then((res) => {
        client.release();
        supplyQueryResult(res.rows);
      });
  });
}
