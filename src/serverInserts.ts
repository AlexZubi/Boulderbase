const { client } = require("./database");
let clientImp;
client.then((data) => (clientImp = data));

export function scrapedSection(cragName: string) {
  //Saves the areas and date of the scraped section to a table

  /*async function test(cragName: any) {
    const bla = await clientImp.query(
      "SELECT name, scraping_date FROM scraped WHERE name = ($1) AND  scraping_date < now() - '1 minute' :: interval"
      [cragName]
    );
    return bla;
  }
  test(cragName).then((data) => distribute(data));

  function distribute(data) {
    var json = data.rows;
    console.log(json)
  }*/

  try {
    clientImp.query(
      "INSERT INTO scraped (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
      [cragName]
    );
  } catch (err) {
    console.log(err);
  }
}

export function scrapedBoulders(boulder) {
  //Saves the boulders of the scraping to a table
  const names = 0;
  const grades = 1;
  const area = 2;

  for (var i = 0; i < boulder[names].length; i++) {
    clientImp.query(
      "INSERT INTO scrapedBoulders (name, grade, area) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING",
      [boulder[names][i], boulder[grades][i], boulder[area]]
    );
  }
}
