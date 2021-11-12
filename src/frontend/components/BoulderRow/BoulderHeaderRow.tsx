import React, { ChangeEvent, useState } from "react";

import { Boulder } from "../../../models/common";
import { retrieveBoulders, retrieveUserBoulders } from "../../helper/requests";
import buildClassName from "../../helper/buildClassName";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import "./BoulderRow.scss";

interface BoulderHeaderRowProps {
  labels: string[];
  onSort?: (label: string) => void;
  setSearchedBoulders: (boulder: Boulder[]) => void;
  setFetchedBoulders: (boulder: Boulder[]) => void;
}

export const BoulderHeaderRow = ({
  labels,
  onSort,
  setSearchedBoulders,
  setFetchedBoulders,
}: BoulderHeaderRowProps) => {
  const [searchedArea, setSearchedArea] = useState(null);

  const handleAreaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchedArea(event.target.value);
  };

  const handleAreaSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchedArea) {
      alert("Please add an area");

      return;
    }
    retrieveBoulders(searchedArea)
      .then((boulder) => {
        setSearchedBoulders(boulder);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleButtonClick = () => {
    retrieveUserBoulders().then((boulders) => setFetchedBoulders(boulders));
  };

  return (
    <div
      className={buildClassName(
        "boulder-row",
        { header: true },
        "boulder-row__cells"
      )}
    >
      <form className="area-form" onSubmit={handleAreaSubmit}>
        <Input
          name="searchArea"
          placeholder="Area"
          onChange={handleAreaChange}
        />
      </form>

      {labels.map((label) => {

        return (
          <Button
            key={label}
            className="boulder-row__cell"
            label={label}
            onClick={() => onSort(label)}
          />
        );
      })}
      <div>
        {window.location.pathname == "/" ? (
          <Button
            label="Show climbed Boulders"
            linkTo="/userTable"
            onClick={handleButtonClick}
          />
        ) : (
          <Button label="Go Back" linkTo="/" />
        )}
      </div>
    </div>
  );
};
