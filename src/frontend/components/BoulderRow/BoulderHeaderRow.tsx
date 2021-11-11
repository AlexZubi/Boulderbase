import React from "react";

import buildClassName from "../../helper/buildClassName";
import { Button } from "../Button/Button";

import "./BoulderRow.scss";

interface BoulderHeaderRowProps {
  labels: string[];
  onSort?: (label: string) => void;
}

export const BoulderHeaderRow = ({ labels, onSort }: BoulderHeaderRowProps) => {
  const handleSort = (label: string) => onSort(label);

  return (
    <div className={buildClassName("boulder-row", { header: true }, "boulder-row__cells")}>
      {labels.map((label) => {

        return (
          <Button
            key={label}
            className="boulder-row__cell"
            label={label}
            onClick={() => handleSort(label)}
          />
        );
      })}
    </div>
  );
};
