import React, { useState } from "react";
import { orderBy } from "lodash";

import { BoulderHeaderRow } from "../BoulderRow/BoulderHeaderRow";
import { Boulder } from "../../../models/common";
import { BoulderRow } from "../BoulderRow/BoulderRow";

import "./BoulderGrid.scss";

interface BoulderGridProps {
  boulderData?: Boulder[];
}

export const BoulderGrid = ({ boulderData }: BoulderGridProps) => {

  const [sortedData, setSortedData] = useState<Boulder[]>([]);
  const [sortingKey, setSortingKey] = useState<string>(null);

  const handleSort = (key: string) => {
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
    <div className="boulder-grid">
      <BoulderHeaderRow sortByRow={() => handleSort}/>
      <div className="boulder-grid__rows">
        {boulderData?.map((boulder, index) => (
          <BoulderRow key={index} boulder={boulder} />
        ))}
      </div>
    </div>
  );
};
