export function toTableFormBoulders(array: String[]) {
  //Converts array with boulders to JSON-Form
  let nameAndGrade = {};
  let tableForm = [];
  const name = 0;
  const grade = 1;
  const area = 2;

  for (var j = 0; j < array[name].length; j++) {
    nameAndGrade = {
      name: array[name][j],
      grade: array[grade][j],
      area: array[area],
    };
    tableForm.push(nameAndGrade);
  }
  return tableForm;
}

export function toTableFormArea(array: String[]) {
  //Converts array with areas to JSON-Form
  let nameAndGrade = {};
  let tableForm = [];

  for (var j = 0; j < array.length; j++) {
    nameAndGrade = {
      area: array[j],
    };
    tableForm.push(nameAndGrade);
  }
  return tableForm;
}
