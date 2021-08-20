const cheerio = require('cheerio');
const request = require ('request');


export function getCrags(cragName: string) {

  var baseURL = 'https://27crags.com';
  var searchURL = 'https://27crags.com/site/search?qs=';
  var routeList = '/routelist';
  var fullURL = searchURL.concat(cragName);
  var climbingAreas = [];

  request(fullURL, (error, response, html) => {

    if(!error && response.statusCode == 200){

      const $ = cheerio.load(html);

      $('.name').each((i, ele) => {

        climbingAreas.push($(ele).find('a').attr('href'));
      });
      for(var i = 0; i < climbingAreas.length; i++){
        climbingAreas[i] = baseURL.concat(climbingAreas[i]).concat(routeList);
      }
      getBoulders(climbingAreas[0]);
    }
  });
}
export function getBoulders(area: string){

  request(area, (error, response, html) => {

    if(!error && response.statusCode == 200){

      var routes = [];

      const $ = cheerio.load(html);

      $('.route-block').each((i, ele) =>{

        routes.push($(ele).find('a').text());
      })
      console.log(routes);
    }
  });
}