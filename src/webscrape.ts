const https = require('https');
const cheerio = require('cheerio')

export function getSite(cragName: string) : string {
    
    var baseURL = 'https://27crags.com/site/search?qs='
    var fullURL = baseURL.concat(cragName)

    let data = '';

    let request = https.get('https://27crags.com/site/search?qs=sudelfeld', (res) => {
        if (res.statusCode !== 200) {
            console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
            res.resume();
            return;
          }        
          res.on('data', (chunk) => {
            data += chunk;
          });
        
          res.on('close', () => {
            console.log('Retrieved all data');
          });
    })
    return data;
}

export function getTables(html: string): cheerio.Cheerio{

    const $ = cheerio.load(html);
    const tableElements = $('html body#site-search.user-vistor' +
        'div.body-contain…ner div.row div.col-md-6 div.box-padded.box-white');

    return tableElements;
};