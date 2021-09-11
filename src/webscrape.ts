const cheerio = require("cheerio");
const fetch = require("node-fetch");
import { url } from "inspector";
import { forEach } from "lodash";
import { scrapedBoulders } from "./serverInserts";

export function getSection(cragName: string) {
  //Gets the second section of a supplied area
  let URL = `https://27crags.com/site/search?qs=${cragName}`;
  let climbingAreas = [];
  let i = 0;

  return fetch(URL, { method: "GET" })
    .then((res) => res.text())
    .then((html) => {
      const $ = cheerio.load(html);

      $(".name").each((i: any, ele: any) => {
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
  const boulder = {
    name: String,
    grade: String,
  };
  let boulderList = [];
  const areaConst = 1;
  async function getBoulderInfo(area: any) {
    try {
      if (!validURL(area[link])) {
        throw Error("Area not found");
      }
      return fetch(area[link], { method: "GET" })
        .then((res: any) => res.text())
        .then((html: any) => {
          const $ = cheerio.load(html);

          $(".route-block").each((i: any, ele: any) => {
            boulderList[i] = Object.create(boulder);
            boulderList[i].name = $(ele).find(".lfont").text();
          });
          $(".grade").each((i: any, ele: any) => {
            boulderList[i].grade = $(ele).text();
          });
        });
    } catch (err) {
      console.log(err);
    }
  }
  return await getBoulderInfo(area)
    .then(() => {
      scrapedBoulders(boulderList, area[areaConst]);
      return boulderList;
    })
}

function validURL(link: string) {
  //Checks if input is a valid URL
  let url: any;
  try {
    url = new URL(link);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
