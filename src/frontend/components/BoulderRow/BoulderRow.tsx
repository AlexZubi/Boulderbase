import React from "react";

import { Boulder } from "../../../models/common";
import { Boulders } from "../Boulder/Boulders";

import "./BoulderRow.scss";

interface BoulderRowProps {
  boulder: Boulder;
  fetchedBoulders?: Boulder[];
  setFetchedBoulders?: (boulder: Boulder[]) => void;
  onDelete?: (boulder: Boulder) => void;
}

export const BoulderRow = ({
  boulder,
  fetchedBoulders,
  setFetchedBoulders,
  onDelete,
}: BoulderRowProps) => {

  return (
    <div className="boulder-row">
      <div className="boulder-row__cells">
        <div className="boulder-row__cell">
          <Boulders
            boulder={boulder}
            fetchedBoulders={fetchedBoulders}
            setFetchedBoulders={setFetchedBoulders}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  );
};
