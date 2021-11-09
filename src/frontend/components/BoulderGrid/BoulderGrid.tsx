import React from "react";

import { BoulderHeaderRow } from "../BoulderRow/BoulderHeaderRow";
import { Boulder } from "../../../models/common";
import { BoulderRow } from "../BoulderRow/BoulderRow";
import "./BoulderGrid.scss";

interface BoulderGridProps {
  boulderData?: Boulder[];
}

export const BoulderGrid = ({ boulderData }: BoulderGridProps) => {
  
  return (
    <div className="boulder-grid">
      <BoulderHeaderRow />
      <div className="boulder-grid__rows">
        {boulderData?.map((boulder, index) => (
          <BoulderRow key={`${boulder.name}${index}`} boulder={boulder} />
        ))}
      </div>
    </div>
  );
};
