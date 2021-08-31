const { client } = require("./database");
let clientImp;
client.then((data) => (clientImp = data));

export function addToDbNames(boulders: string[]) {
  const name = 0;
  const grade = 1;

  for (var i = 0; i < boulders[name].length; i++) {
    clientImp.query("INSERT INTO boulders (name, grade) VALUES ($1, $2)", [
      boulders[name][i],
      boulders[grade][i],
    ]);
  }
}
export function getFromDb(nameAndGrade) { 
  clientImp.query("SELECT (name, grade) FROM boulders", nameAndGrade);
}
