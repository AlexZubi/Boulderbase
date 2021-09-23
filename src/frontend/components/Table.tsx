import React, { useMemo, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import orderBy from "lodash/orderBy";
import { useTable } from "react-table";
import { sendClimbed, deleteClimbed } from "../helper/requestHelper";
import "./styles/table.css";
export const Table = ({ tableData, columns, deleteBoulder }) => {
  columns = useMemo(() => columns, [columns]);
  const [sortedData, setSortedData] = useState([]);
  const [sortingKey, setSortingKey] = useState(null);
  let data = [...tableData];

  function requestSort(key: String) {
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                      {index === 0 && row.original.area == null ? (
                        <div
                          className={"addIcon"}
                          onClick={() => {
                            sendClimbed(row.original);
                          }}
                        >
                          {index === 0 && row.original.area == null ? (
                            <IoMdCheckmark />
                          ) : null}
                        </div>
                      ) : null}
                      {index === 0 && row.original.area != null ? (
                        <div
                          className={"deleteIcon"}
                          onClick={() => {
                            deleteBoulder(row.original);
                            deleteClimbed(row.original);
                          }}
                        >
                          {index === 0 && row.original.area != null ? (
                            <IoMdClose />
                          ) : null}
                        </div>
                      ) : null}
                    </td>
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
