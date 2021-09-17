import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { sendClimbed } from "./root/toMiddleware";
import clickHelper from "./root/clickHelper";
import "./styles/table.css";
export const Table = ({ data, columns }) => {
  columns = useMemo(() => columns, []);

  const [selection, selectBoulder] = useState({});

  useEffect(() => {
    async function toDatabase() {
      try {
        if (clickHelper(selection)) {
          sendClimbed(selection, function(data){
            console.log(data)
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
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
