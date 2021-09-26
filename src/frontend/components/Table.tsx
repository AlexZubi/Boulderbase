import React, { useState } from "react";
import PropTypes from "prop-types";
import orderBy from "lodash/orderBy";
import "./styles/table.css";
export const Table = ({ tableData, headingColumns, deleteBoulder }) => {
  let tableClass = "table-container__table";
  const [sortedData, setSortedData] = useState([]);
  const [sortingKey, setSortingKey] = useState(null);

  function requestSort(key: String) {
    if (sortingKey !== key) {
      setSortedData(orderBy(tableData, key.toLowerCase(), ["asc"]));
      setSortingKey(key);
    } else {
      setSortedData(orderBy(tableData, key.toLowerCase(), ["desc"]));
      setSortingKey(null);
    }
  }
  if (sortedData.length > 0) {
    tableData = [...sortedData];
  }

  const data = tableData.map((row, index) => {
    let rowData = [];
    let i = 0;

    for (const key in row) {
      rowData.push({
        key: headingColumns[i],
        val: row[key],
      });
      i++;
    }

    return (
      <tr key={index}>
        {rowData.map((data, index) => (
          <td key={index} data-heading={data.key}>
            {data.val}
          </td>
        ))}
      </tr>
    );
  });

  return (
    <div className="table-container">
      <div className="table-container__title"></div>
      <table className={tableClass}>
        <thead>
          <tr>
            {headingColumns.map((col, index) => (
              <th key={index}>
                <button type="button" onClick={() => requestSort(col)}>
                  {col}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteBoulder: PropTypes.func,
};

export default Table;
