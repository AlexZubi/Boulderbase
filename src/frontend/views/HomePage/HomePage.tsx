import React, { ChangeEvent, useState } from "react";

var background = require("../../assets/Background1.jpg");
import { Boulder } from "../../../models/common";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { retrieveBoulders } from "../../helper/requests";

interface HomePageProps {
  setSearchedBoulders: (boulders: Boulder[]) => void;
}

const HomePage = ({ setSearchedBoulders }: HomePageProps) => {
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
    <div className="homepage">
      <img className="homepage__background" src={background} />
      <div className="homepage__input-element">
        <Input
          name="SearchArea"
          placeholder="Search climbing area"
          onChange={handleAreaChange}
        />
        <span className="homepage__input-element--button">
          <Button
            label="Search"
            color="green"
            linkTo="/resultPage"
            onClick={handleAreaSubmit}
          />
        </span>
        <span className="homepage__input-element--button">
          <Button
            label="Climbed Boulders"
            color="green"
            linkTo="/userPage"
          />
        </span>
      </div>
    </div>
  );
};

export default HomePage;
