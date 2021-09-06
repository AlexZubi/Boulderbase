const { client } = require("./database");
let clientImp;
client.then((data) => (clientImp = data));

export function scrapedAreas(cragName: string) {
    //Adds the clicked boulder to the "so-far climbed"-database
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
    //No function yet, planned to add multiple boulders to the "so-far climbed"-database
    const names = 0;
    const grades = 1;
    const area = 2;
  
    for (var i = 0; i < boulder[names].length; i++) {
      clientImp.query("INSERT INTO scrapedBoulders (name, grade, area) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING", [
        boulder[names][i],
        boulder[grades][i],
        boulder[area],
      ]);
    }
  }