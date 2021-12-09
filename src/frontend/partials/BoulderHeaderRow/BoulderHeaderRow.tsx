import React, { ChangeEvent, useState } from "react";

import { Boulder } from "../../../models/common";
import { retrieveBoulders, retrieveUserBoulders } from "../../helper/requests";
import buildClassName from "../../helper/buildClassName";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";

interface BoulderHeaderRowProps {
  labels: object;
  onSort?: (label: string) => void;
  setFetchedBoulders: (boulder: Boulder[]) => void;
}

export const BoulderHeaderRow = ({
  labels,
  onSort,
  setFetchedBoulders,
}: BoulderHeaderRowProps) => {
  const handleButtonClick = () => {
    retrieveUserBoulders().then((boulders) => setFetchedBoulders(boulders));
  };

  return (
    <div className={buildClassName("boulder-header-row", { header: true })}>
      <div className="boulder-header-row__cells">
        {Object.values(labels).map((label) => {
          return (
            <div className="boulder-header-row__cell">
              <Button key={label} label={label} onClick={() => onSort(label)} />
            </div>
          );
        })}
        <div className="boulder-header-row__button">
          <Button
            color="red"
            label={window.location.pathname == "/" ? "User Table" : "Go Back"}
            linkTo={window.location.pathname == "/" ? "/userTable" : "/"}
            onClick={window.location.pathname == "/" ? handleButtonClick : null}
          />
        </div>
      </div>
    </div>
  );
};
