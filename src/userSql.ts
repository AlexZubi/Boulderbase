import { connection } from "./connection";
import map from "lodash/map";
import { boulderType } from "./boulderType";

export async function addToDbSingle(boulder: boulderType) {
  //Adds the clicked boulder to the "so-far climbed"-database
  function getArea(boulder, boulderResult) {
    connection
      .query("SELECT area FROM scrapedboulders WHERE name = ($1)", [
        boulder.name,
      ])
      .then((res) => {
        let area = map(res.rows, "area");
        boulder.area = area[0];
        boulderResult(boulder);
      })
      .catch((err) => console.log(err.message));
  }
  getArea(boulder, function (boulder) {
    connection.query(
      "INSERT INTO boulders (name, grade, area) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING",
      [boulder.name, boulder.grade, boulder.area]
    );
  });
}
export async function getFromDb(climbedBoulders: Function) {
  //Gets all boulder from the "so-far climbed"-database
  connection
    .query("SELECT name, grade, area FROM boulders")
    .then((res) => climbedBoulders(res));
}
/*export function addToDbMultiple(boulders: string[]) {
  //No function yet, planned to add multiple boulders to the "so-far climbed"-database
  const name = 0;
  const grade = 1;

  for (var i = 0; i < boulders[name].length; i++) {
    getConnection(function (err, con) {
      con.query("INSERT INTO boulders (name, grade) VALUES ($1, $2)", [
        boulders[name][i],
        boulders[grade][i],
      ]);
    });
  }
}*/