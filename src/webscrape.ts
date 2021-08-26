const cheerio = require('cheerio');
const request = require('request');
const fetch = require('node-fetch');

export function getCrags(cragName: string) {

  var baseURL = 'https://27crags.com';
  var searchURL = 'https://27crags.com/site/search?qs=';
  var routeList = '/routelist';
  var fullURL = searchURL.concat(cragName);
  var climbingAreas = [];

  return fetch(fullURL, { method: "GET" }).then(res => res.text()).then((html) => {

    const $ = cheerio.load(html);

    $('.name').each((i, ele) => {
      climbingAreas.push($(ele).find('a').attr('href'));
    });
    for (var i = 0; i < climbingAreas.length; i++) {
      climbingAreas[i] = baseURL + climbingAreas[i] + routeList;
    }
    return climbingAreas[1];
  });
}

export function getBoulders(area: string) {

  return fetch(area, { method: "GET" 6}).then(res => res.text()).then((html) => {

    var routes = [];

    const $ = cheerio.load(html);

    $('.route-block').each((i, ele) => {

      routes.push($(ele).find('a').text());
    })
    console.log(routes)
    return routes;
  })
}