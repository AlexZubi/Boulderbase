import React from "react";

import buildClassName from "../../helper/buildClassName";
import { Boulder } from "../../../models/common";

import "./BoulderRow.scss";

interface BoulderRowProps {
  boulder: Boulder;
}

export const BoulderRow = ({ boulder }: BoulderRowProps) => {

  return (
    <div className="boulder-row">
      <div className="boulder-row__cells">
        <div className="boulder-row__cell">{boulder.name}</div>
        <div className="boulder-row__cell">{boulder.grade}</div>
        <div className="boulder-row__cell">{boulder.area}</div>
      </div>
    </div>
  );
};
