import { PoolClient, QueryResult } from "pg";

import { Boulder } from "../models/common";

const cheerio = require("cheerio");
const fetch = require("node-fetch");

export function retrieveSectionLink(section: string): string {
  const CLIMBING_AREA_INDEX = 1;
  const URL = `https://27crags.com/site/search?qs=${section}`;
  const climbingAreas: string[] = [];

  return fetch(URL, { method: "GET" })
    .then((response: Response) => response.text())
    .then((html: string) => {
      const $ = cheerio.load(html);

      $(".name").each((index: number, element: string) => {
        const href = $(element).find("a").attr("href");

        climbingAreas.push(`https://27crags.com/${href}/routelist`);
      });

      return climbingAreas[CLIMBING_AREA_INDEX];
    });
}

export function saveBouldersForSection(
  sectionLink: string,
  section: string,
  client: PoolClient
): Promise<QueryResult[]> {
  if (!isUrlValid(sectionLink)) {
    console.error("Area not found");
  } else {
      
    return fetch(sectionLink, { method: "GET" })
      .then((response: Response) => {

        return response.text();
      })
      .then((html: string) => {

        return cheerio.load(html);
      })
      .then(($) => {

        return Promise.all(
          $("tr").map((index: number, element: string) => {
            let boulder: Boulder = {
              name: $(element).find(".lfont").text(),
              grade: $(element).find(".grade").text(),
            };
            if (boulder.name.length) {

              return client.query(
                "INSERT INTO webscraped_boulder (name, grade, area) VALUES ($1, $2, $3)",
                [boulder.name, boulder.grade, section]
              );
            }
          })
        );
      });
  }
}

function isUrlValid(link: string): boolean {
  try {
    const url = new URL(link);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
      
    return false;
  }
}
