export function toTableFormBoulders(array: String[]) {
  let nameAndGrade = {};
  let tableForm = [];
  const name = 0;
  const grade = 1;

  for (var j = 0; j < array[name].length; j++) {
    nameAndGrade = {
      name: array[name][j],
      grade: array[grade][j],
    };
    tableForm.push(nameAndGrade);
  }
  return tableForm;
}

export function toTableFormArea(array: String[]) {
  let nameAndGrade = {};
  let tableForm = [];

  for (var j = 0; j < array.length; j++) {
    nameAndGrade = {
      area: array[j]
    };
    tableForm.push(nameAndGrade);
  }
  return tableForm;
}
