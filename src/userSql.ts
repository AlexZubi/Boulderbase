const { client } = require("./database");
import map from "lodash/map";
let clientImp;
client.then((data: any) => (clientImp = data));

export async function addToDbSingle(boulder: any) {
  //Adds the clicked boulder to the "so-far climbed"-database
  try {
    await clientImp
      .query("SELECT area FROM scrapedboulders WHERE name = ($1)", [
        boulder.name,
      ])
      .then((res) => {
        let area = map(res.rows, "area");
        boulder.area = area[0];
      });
    clientImp.query(
      "INSERT INTO boulders (name, grade, area) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING",
      [boulder.name, boulder.grade, boulder.area]
    );
  } catch (err) {
    console.log(err);
  }
}

export function addToDbMultiple(boulders: string[]) {
  //No function yet, planned to add multiple boulders to the "so-far climbed"-database
  const name = 0;
  const grade = 1;

  for (var i = 0; i < boulders[name].length; i++) {
    clientImp.query("INSERT INTO boulders (name, grade) VALUES ($1, $2)", [
      boulders[name][i],
      boulders[grade][i],
    ]);
  }
}
export function getFromDb() {
  //Gets all boulder from the "so-far climbed"-database
  return clientImp.query("SELECT name,grade,area FROM boulders");
}
