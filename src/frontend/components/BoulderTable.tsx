import React, { useState } from "react";
import orderBy from "lodash/orderBy";
import { sendClimbed, deleteClimbed } from "../helper/requestHelper";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { BoulderType } from "./types/boulderType";
import "./styles/table.css";

interface TableProps {
  boulderData: BoulderType[];
  headingColumns: string[];
  deleteBoulder?: (boulder: BoulderType) => void;
}

export const BoulderTable = ({
  boulderData,
  headingColumns,
  deleteBoulder,
}: TableProps) => {
  const [sortedData, setSortedData] = useState<BoulderType[]>([]);
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
          {boulderData.map((boulder: BoulderType, index: number) => (
            <tr key={index}>
              <td className="test">
                {boulder.name}
                {deleteBoulder ? (
                  <div
                    className={"deleteIcon"}
                    onClick={() => {
                      deleteBoulder(boulder);
                      deleteClimbed(boulder);
                    }}
                  >
                    <IoMdClose />
                  </div>
                ) : (
                  <div
                    className={"addIcon"}
                    onClick={() => {
                      sendClimbed(boulder);
                    }}
                  >
                    <IoMdCheckmark />
                  </div>
                )}
              </td>
              <td>{boulder.grade}</td>
              {deleteBoulder ? <td>{boulder.area}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoulderTable;
