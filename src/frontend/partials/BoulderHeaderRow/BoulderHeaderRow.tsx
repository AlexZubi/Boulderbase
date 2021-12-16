import React from "react";
import { faSort } from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "../../components/IconButton/IconButton";

interface BoulderHeaderRowProps {
  labels: object;
  onSort?: (label: string) => void;
}

export const BoulderHeaderRow = ({ labels, onSort }: BoulderHeaderRowProps) => {
  const handleSort = (label: string) => onSort(label);

  return (
    <div className="boulder-header-row">
      <div className="boulder-header-row__container">
        {Object.values(labels).map((label) => {
          return (
            <div key={label} className="boulder-header-row__container__cell">
              {label}
              <IconButton icon={faSort} onClick={() => handleSort(label)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
