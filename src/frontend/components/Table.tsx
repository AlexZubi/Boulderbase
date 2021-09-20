import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { sendClimbed } from "./root/toMiddleware";
import clickHelper from "./root/clickHelper";
import "./styles/table.css";
export const Table = ({ tableData, columns }) => {
  columns = useMemo(() => columns, [columns]);
  const [selection, selectBoulder] = useState({});
  const [sortConfig, setSortConfig] = useState(null);

  let data = null;
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig !== null) {
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
    }
    setSortConfig({ key, direction });
  };
  data = [...tableData];
  if (sortConfig !== null) {
    data.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  useEffect(() => {
    async function toDatabase() {
      try {
        if (clickHelper(selection)) {
          sendClimbed(selection, function (data) {
            console.log(data);
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (Object.keys(selection).length > 0) {
      toDatabase();
    }
  });

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
                onClick={() => selectBoulder(row.original)}
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
