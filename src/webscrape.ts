const cheerio = require("cheerio");
const fetch = require("node-fetch");
import { scrapedBoulders } from "./serverInserts";

export function getSection(cragName: string) {
  //Gets the second section of a supplied area
  var baseURL = "https://27crags.com";
  var searchURL = "https://27crags.com/site/search?qs=";
  var routeList = "/routelist";
  var fullURL = searchURL.concat(cragName);
  var climbingAreas = [];

  return fetch(fullURL, { method: "GET" })
    .then((res) => res.text())
    .then((html) => {
      const $ = cheerio.load(html);

      $(".name").each((i, ele) => {
        climbingAreas.push($(ele).find("a").attr("href"));
      });
      for (var i = 0; i < climbingAreas.length; i++) {
        climbingAreas[i] = baseURL + climbingAreas[i] + routeList;
      }
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
  async function getBoulderInfo(area) {
    return fetch(area[link], { method: "GET" })
      .then((res) => res.text())
      .then((html) => {
        const $ = cheerio.load(html);

        $(".route-block").each((i: any, ele) => {
          boulderList[i] = Object.create(boulder);
          boulderList[i].name = $(ele).find(".lfont").text();
        });
        $(".grade").each((i, ele) => {
          boulderList[i].grade = $(ele).text();
        });
      });
  }
  return await getBoulderInfo(area).then(() => {
    scrapedBoulders(boulderList, area[areaConst]);
    return boulderList;
  });
}
