import { forEach } from "lodash";
import { newScrapedSection } from "./scrapingInserts";
import { BoulderType } from "../models/boulderType";
import getConnection from "../database/connectionPool";

const cheerio = require("cheerio");
const fetch = require("node-fetch");

export function getSection(cragName: string): string[] {
  //Gets the second section of a supplied area (second section temporarily for simplicity reasons)
  let URL = `https://27crags.com/site/search?qs=${cragName}`;
  let climbingAreas: string[] = [];
  let i = 0;

  return fetch(URL, { method: "GET" })
    .then((res: Response) => res.text())
    .then((html: string) => {
      const $ = cheerio.load(html);

      $(".name").each((i: number, ele: string) => {
        climbingAreas.push($(ele).find("a").attr("href"));
      });
      forEach(climbingAreas, function (area) {
        climbingAreas[i] = `https://27crags.com/${area}/routelist`;
        i++;
      });
      return [climbingAreas[1], cragName];
    });
}

export async function getBoulderNames(area: string[]): Promise<void> {
  //Gets all the boulders of a supplied section
  const link = 0;
  const areaConst = 1;
  async function getBoulderInfo(area: string[]): Promise<void> {
    try {
      if (!validURL(area[link])) {
        throw Error("Area not found");
      }
      newScrapedSection(area[areaConst]);
      await fetch(area[link], { method: "GET" })
        .then((res: Response) => res.text())
        .then(async (html: string) => {
            const $ = cheerio.load(html);
            getConnection().then( (client) => {
            $("tr").each((i: number, ele: string) => {
              let boulder: BoulderType = {
                name: $(ele).find(".lfont").text(),
                grade: $(ele).find(".grade").text(),
              };
              if (boulder.name.length > 0) {
                client.query(
                  "INSERT INTO webscraped_boulder (name, grade, area) VALUES ($1, $2, $3)",
                  [boulder.name, boulder.grade, area[areaConst]]
                );
                }
            });
            console.log("Hello")
            client.release();
          });
        });
    } catch (err) {
      console.log(err);
      console.log("Server is listening...");
    }
  }
  return await getBoulderInfo(area);
}

function validURL(link: string): boolean {
  //Checks if input is a valid URL
  let url: URL;
  try {
    url = new URL(link);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
