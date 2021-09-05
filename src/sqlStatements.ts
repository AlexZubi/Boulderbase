const { client } = require("./database");
let clientImp;
client.then((data) => (clientImp = data));

export function addToDbSingle(boulder) {
  //Adds the clicked boulder to the "so-far climbed"-database
  type boulder = {
    name: string;
    grade: string;
  };

  clientImp.query("INSERT INTO boulders (name, grade) VALUES ($1, $2)", [
    boulder.name,
    boulder.grade,
  ]);
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
  let fullDataSet: string[];

  async function selectAll() {
    const nameAndGrade = await clientImp.query(
      "SELECT name,grade FROM boulders",
      fullDataSet
    );
    return nameAndGrade;
  }
  return selectAll();
}
