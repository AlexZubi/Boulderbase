import React from "react";

import { Button } from "../../components/Button/Button";
import buildClassName from "../../helper/buildClassName";

interface BoulderHeaderRowProps {
  labels: object;
  onSort?: (label: string) => void;
}

export const BoulderHeaderRow = ({ labels, onSort }: BoulderHeaderRowProps) => {
  return (
    <div className={buildClassName("boulder-header-row", { header: true })}>
      <div className="boulder-header-row__cells">
        {Object.values(labels).map((label) => {
          return (
            <div className="boulder-header-row__cell">
              <label>{label}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
