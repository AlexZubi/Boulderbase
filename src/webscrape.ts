import { forEach } from "lodash";
import { newScrapedSection, scrapedBoulders } from "./scrapingInserts";
import { BoulderType } from "./models/boulderType";

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

export async function getBoulderNames(area: string[]): Promise<BoulderType[]> {
  //Gets all the boulders of a supplied section
  const link = 0;
  let boulderList: BoulderType[] = [];
  const areaConst = 1;
  async function getBoulderInfo(area: string[]): Promise<BoulderType[]> {
    try {
      if (!validURL(area[link])) {
        throw Error("Area not found");
      }
      newScrapedSection(area[areaConst]);
      return fetch(area[link], { method: "GET" })
        .then((res: Response) => res.text())
        .then((html: string) => {
          const $ = cheerio.load(html);
          $("tr").each((i: number, ele: string) => {
            const boulder: BoulderType = {
              name: $(ele).find(".lfont").text(),
              grade: $(ele).find(".grade").text(),
            };
            if (i > 0) {
              boulderList[i - 1] = boulder;
            }
          });
        });
    } catch (err) {
      console.log(err);
      console.log("Server is listening...");
    }
  }
  return await getBoulderInfo(area).then(() => {
    scrapedBoulders(boulderList, area[areaConst]);
    return boulderList;
  });
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
