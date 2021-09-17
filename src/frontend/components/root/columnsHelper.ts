export default function columnsHelper(selection: number) {
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
