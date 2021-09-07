const { client } = require("./database");
let clientImp;
client.then((data) => (clientImp = data));

export function newScrapedSection(cragName: string) {
  //Saves the areas and date of the scraped section to a table
  try {
    clientImp.query(
      "INSERT INTO scraped (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
      [cragName]
    );
  } catch (err) {
    console.log(err);
  }
}
export function existingScrapedSection(cragName: string) {
  //Updates the date of the section in the scraped table
  try {
    clientImp.query(
      "UPDATE scraped SET scraping_date = now() WHERE name = ($1)",
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
