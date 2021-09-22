import React, { useMemo, useState } from "react";
import orderBy from "lodash/orderBy";
import { useTable } from "react-table";
import addDeleteHelper from "../helper/tableHelper/addDeleteHelper";
import clickRowHelper from "../helper/tableHelper/clickRowHelper";
import "./styles/table.css";
export const Table = ({ tableData, columns, deleteBoulder }) => {
  columns = useMemo(() => columns, [columns]);
  const [sortedData, setSortedData] = useState([]);
  const [sortingKey, setSortingKey] = useState(null);
  let data = [...tableData];

  function requestSort(key) {
    if (sortingKey !== key) {
      setSortedData(orderBy(data, key, ["asc"]));
      setSortingKey(key);
    } else {
      setSortedData(orderBy(data, key, ["desc"]));
      setSortingKey(null);
    }
  }
  if (sortedData.length > 0) {
    data = [...sortedData];
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <button type="button" onClick={() => requestSort(column.id)}>
                    {column.render("Header")}
                  </button>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => {
                  addDeleteHelper(row.original);
                  if (!clickRowHelper(row.original)) {
                    deleteBoulder(row.original);
                  }
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};
