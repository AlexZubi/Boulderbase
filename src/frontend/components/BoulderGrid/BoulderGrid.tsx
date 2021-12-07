import React, { useState } from "react";
import { orderBy } from "lodash";

import { BoulderHeaderRow } from "../BoulderHeaderRow/BoulderHeaderRow";
import { Boulder } from "../../../models/common";
import { BoulderRow } from "../BoulderRow/BoulderRow";
import { tableHeader } from "../../text/labels";

import "./BoulderGrid.scss";

interface BoulderGridProps {
  boulderData?: Boulder[];
  setSearchedBoulders?: (boulder: Boulder[]) => void;
  fetchedBoulders?: Boulder[];
  setFetchedBoulders?: (boulder: Boulder[]) => void;
  deleteBoulder?: (boulder: Boulder) => void;
}

export const BoulderGrid = ({
  boulderData,
  setSearchedBoulders,
  fetchedBoulders,
  setFetchedBoulders,
  deleteBoulder,
}: BoulderGridProps) => {
  const [sortedData, setSortedData] = useState([]);
  const [sortingKey, setSortingKey] = useState(null);

  const handleSort = (key: string) => {
    if (sortingKey !== key) {
      setSortedData(orderBy(boulderData, key.toLowerCase(), ["asc"]));
      setSortingKey(key);
    } else {
      setSortedData(orderBy(boulderData, key.toLowerCase(), ["desc"]));
      setSortingKey(null);
    }
  };

  if (sortedData.length > 0) {
    boulderData = [...sortedData];
  }

  return (
    <div className="boulder-grid">
      <BoulderHeaderRow
        labels={tableHeader}
        onSort={handleSort}
        setSearchedBoulders={setSearchedBoulders}
        setFetchedBoulders={setFetchedBoulders}
      />
      <div className="boulder-grid__rows">
        {boulderData?.map((boulder, index) => (
          <BoulderRow
            key={index}
            boulder={boulder}
            onDelete={deleteBoulder}
            fetchedBoulders={fetchedBoulders}
            setFetchedBoulders={setFetchedBoulders}
          />
        ))}
      </div>
    </div>
  );
};
