const { client } = require("./database");
let clientImp;
client.then((data) => (clientImp = data));

export function addToDbSingle(boulder) {
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
