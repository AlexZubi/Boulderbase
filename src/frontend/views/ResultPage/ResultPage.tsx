import React, { ChangeEvent, useState } from "react";

var background = require("../../assets/Background1.jpg");
import { Boulder } from "../../../models/common";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { retrieveBoulders } from "../../helper/requests";
import { BoulderGrid } from "../../partials/BoulderGrid/BoulderGrid";

interface ResultPageProps {
  searchedBoulders: Boulder[];
  fetchedBoulders: Boulder[];
  setSearchedBoulders: (boulders: Boulder[]) => void;
  setFetchedBoulders: (boulders: Boulder[]) => void;
}

const ResultPage = ({
  searchedBoulders,
  setSearchedBoulders,
  fetchedBoulders,
  setFetchedBoulders,
}: ResultPageProps) => {
  const [searchedArea, setSearchedArea] = useState(null);

  const handleAreaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchedArea(event.target.value);
  };

  const handleAreaSubmit = () => {
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
  return (
    <div className="resultpage">
      <img className="resultpage__image" src={background} />
      <div className="resultpage__input-element">
        <Input
          name="SearchArea"
          placeholder="Search climbing area"
          onChange={handleAreaChange}
        />
        <span className="resultpage__input-element--button">
          <Button
            label="Search"
            color="green"
            linkTo="/resultPage"
            onClick={handleAreaSubmit}
          />
        </span>
      </div>
    </div>
  );
};

export default ResultPage;
