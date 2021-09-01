const cheerio = require("cheerio");
const request = require("request");
const fetch = require("node-fetch");

export function getAreas(cragName: string) {
  var searchURL = "https://27crags.com/site/search?qs=";
  var fullURL = searchURL.concat(cragName);
  var climbingAreas = [];

  return fetch(fullURL, { method: "GET" })
    .then((res) => res.text())
    .then((html) => {
      const $ = cheerio.load(html);

      $(".name").each((i, ele) => {
        climbingAreas.push($(ele).text().replace(/\n/g, ''));
      });
      console.log(climbingAreas);
      return climbingAreas;
    });
}

export function getLinks(cragName: string) {
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
      return climbingAreas[1];
    });
}

export function getBoulderNames(area: string) {
  return fetch(area, { method: "GET" })
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
      return [names, grades];
    });
}
