import React, { useState } from "react";
import PropTypes from "prop-types";
import orderBy from "lodash/orderBy";
import { sendClimbed, deleteClimbed } from "../helper/requestHelper";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { BoulderType } from "../components/types/boulderType"
import "./styles/table.css";

export const Table = ({ boulderData, headingColumns, deleteBoulder }) => {
  const [sortedData, setSortedData] = useState([]);
  const [sortingKey, setSortingKey] = useState(null);

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
              <td>
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

Table.propTypes = {
  boulderData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteBoulder: PropTypes.func,
};

export default Table;
