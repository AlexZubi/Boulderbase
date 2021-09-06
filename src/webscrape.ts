const cheerio = require("cheerio");
const fetch = require("node-fetch");
import { scrapedSection, scrapedBoulders } from "./serverInserts";

export function getSections(cragName: string) {
  //Gets all the sections of a supplied area
  var searchURL = "https://27crags.com/site/search?qs=";
  var fullURL = searchURL.concat(cragName);
  var climbingAreas = [];

  return fetch(fullURL, { method: "GET" })
    .then((res) => res.text())
    .then((html) => {
      const $ = cheerio.load(html);

      $(".name").each((i, ele) => {
        climbingAreas.push($(ele).text().replace(/\n/g, ""));
      });
      return climbingAreas;
    });
}

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
      scrapedSection(cragName);
      return [climbingAreas[1], cragName];
    });
}

export function getBoulderNames(area: string[]) {
  //Gets all the boulders of a supplied section
  const link = 0;
  const areaConst = 1;
  return fetch(area[link], { method: "GET" })
    .then((res) => res.text())
    .then((html) => {
      const names = [];
      const grades = [];

      const $ = cheerio.load(html);

      $(".route-block").each((i, ele) => {
        names.push($(ele).find(".lfont").text());
      });
      $(".grade").each((i, ele) => {
        grades.push($(ele).text());
      });
      scrapedBoulders([names, grades, area[areaConst]])
      return [names, grades, area[areaConst]];
    });
}
