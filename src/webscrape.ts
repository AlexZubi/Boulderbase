const cheerio = require("cheerio");
const fetch = require("node-fetch");
import { forEach } from "lodash";
import { newScrapedSection, scrapedBoulders } from "./serverInserts";
import { boulderConst } from "./boulderType";

export function getSection(cragName: string) {
  //Gets the second section of a supplied area
  let URL = `https://27crags.com/site/search?qs=${cragName}`;
  let climbingAreas = [];
  let i = 0;

  return fetch(URL, { method: "GET" })
    .then((res: Response) => res.text())
    .then((html: String) => {
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

export async function getBoulderNames(area: string[]) {
  //Gets all the boulders of a supplied section
  const link = 0;
  let boulderList = [];
  const areaConst = 1;
  async function getBoulderInfo(area: string[]) {
    try {
      if (!validURL(area[link])) {
        throw Error("Area not found");
      }
      newScrapedSection(area[areaConst]);
      return fetch(area[link], { method: "GET" })
        .then((res: Response) => res.text())
        .then((html: string) => {
          const $ = cheerio.load(html);

          $(".route-block").each((i: number, ele: string) => {
            boulderList[i] = { boulderConst };
            boulderList[i].name = $(ele).find(".lfont").text();
          });
          $(".grade").each((i: number, ele: string) => {
            boulderList[i].grade = $(ele).text();
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

function validURL(link: string) {
  //Checks if input is a valid URL
  let url: URL;
  try {
    url = new URL(link);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
