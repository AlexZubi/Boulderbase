import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React, { ChangeEvent, useState } from "react";

var background = require("../../assets/Background1.jpg");
import { Boulder } from "../../../models/common";
import { Button } from "../../components/Button/Button";
import { IconButton } from "../../components/IconButton/IconButton";
import { Input } from "../../components/Input/Input";
import { retrieveBoulders } from "../../helper/requests";
import { BoulderGrid } from "../../partials/BoulderGrid/BoulderGrid";

interface ResultPageProps {
  searchedBoulders: Boulder[];
  setSearchedBoulders: (boulders: Boulder[]) => void;
  fetchedBoulders: Boulder[];
  setFetchedBoulders: (boulders: Boulder[]) => void;
}

const ResultPage = ({
  searchedBoulders,
  fetchedBoulders,
  setSearchedBoulders,
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
      <img className="resultpage__background" src={background} />
      <div className="resultpage__container">
        <div className="resultpage__container__header-element">
          <div className="resultpage__container__header-element__back-button">
            <IconButton
              icon={faArrowLeft}
              label="Back to starting page"
              linkTo="/"
            />
          </div>
          <div className="resultpage__container__header-element__input-element">
            <Input
              name="SearchArea"
              placeholder="Search climbing area"
              onChange={handleAreaChange}
            />
            <span className="resultpage__container__header-element__button">
              <Button label="Search" onClick={handleAreaSubmit} />
            </span>
          </div>
        </div>
        <div className="resultpage__container__result-element">
          <BoulderGrid
            boulderData={searchedBoulders}
            fetchedBoulders={fetchedBoulders}
            setFetchedBoulders={setFetchedBoulders}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
