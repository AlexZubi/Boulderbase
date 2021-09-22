export default function columnsHelper(selection: number) {
  //Supplies the right column-structure to the respective table
  const baseColumns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Grade",
      accessor: "grade",
    },
  ];
  const databaseColumn = {
    Header: "Area",
    accessor: "area",
  };
  if (selection === 0) {
    return baseColumns;
  } else {
    baseColumns.push(databaseColumn);
    return baseColumns;
  }
}
