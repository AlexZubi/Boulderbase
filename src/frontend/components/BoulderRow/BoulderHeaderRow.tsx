import React from "react";

import buildClassName from '../../helper/buildClassName';
import "./BoulderRow.scss"

export const BoulderHeaderRow = () => {
    
  return (
    <div className={buildClassName("boulder-row", { header: true }, "boulder-row__cells")}>
      <div className="boulder-row__cell">Name</div>
      <div className="boulder-row__cell">Grade</div>
      <div className="boulder-row__cell">Area</div>
    </div>
  );
};
