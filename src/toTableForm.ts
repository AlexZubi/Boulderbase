export default function toTableForm(array: String[]) {
  let nameAndGrade;
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
