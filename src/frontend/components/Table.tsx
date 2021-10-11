import React, { useState } from "react";
import orderBy from "lodash/orderBy";
import { insertUserBoulder, deleteUserBoulder } from "../helper/requestHelper";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCheckmarkCircle,
  IoMdClose,
} from "react-icons/io";
import find from "lodash/find";
import { Boulder } from "./types/common";
import "./styles/table.css";

interface TableProps {
  boulderData: Boulder[];
  fetchedBoulders?: Boulder[];
  setFetchedBoulders?: Promise<void>
  headingColumns: string[];
  deleteBoulder?: (boulder: Boulder) => void;
}

export const Table = ({
  boulderData,
  fetchedBoulders,
  headingColumns,
  deleteBoulder,
}: TableProps) => {
  const [sortedData, setSortedData] = useState<Boulder[]>([]);
  const [sortingKey, setSortingKey] = useState<string>(null);

  function requestSort(key: string) {
    if (sortingKey !== key) {
      setSortedData(orderBy(boulderData, key.toLowerCase(), ["asc"]));
      setSortingKey(key);
    } else {
      setSortedData(orderBy(boulderData, key.toLowerCase(), ["desc"]));
      setSortingKey(null);
    }
  }
  if (sortedData.length > 0) {
    boulderData = [...sortedData];
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {headingColumns.map((col: string, index: number) => (
              <th key={index}>
                <button type="button" onClick={() => requestSort(col)}>
                  {col}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {boulderData.map((boulder: Boulder, index: number) => {
            return (
              <tr key={index}>
                <td className="tableName__row">
                  {boulder.name}
                  {deleteBoulder ? (
                    <div
                      className={"deleteIcon"}
                      onClick={() => {
                        deleteBoulder(boulder);
                        deleteUserBoulder(boulder.boulder_id);
                      }}
                    >
                      <IoMdClose />
                    </div>
                  ) : (
                    <div
                      className={"addIcon"}
                      onClick={() => {
                        insertUserBoulder(boulder.boulder_id);
                      }}
                    >
                      {find(fetchedBoulders, boulder) ? (
                        <IoIosCheckmarkCircle />
                      ) : (
                        <IoIosCheckmarkCircleOutline />
                      )}
                    </div>
                  )}
                </td>
                <td>{boulder.grade}</td>
                {deleteBoulder ? <td>{boulder.area}</td> : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
