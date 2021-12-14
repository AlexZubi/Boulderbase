import React from "react";

var background = require("../../assets/Background1.jpg");

import { Boulder } from "../../../models/common";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

interface HomePageProps {
  searchedBoulders: Boulder[];
  fetchedBoulders: Boulder[];
  setSearchedBoulders: (boulders: Boulder[]) => void;
  setFetchedBoulders: (boulders: Boulder[]) => void;
}

const HomePage = ({
  searchedBoulders,
  setSearchedBoulders,
  fetchedBoulders,
  setFetchedBoulders,
}: HomePageProps) => {
  return (
    <div className="homepage">
      <div className="homepage__image"></div>
      <img className="homepage__image--file" src={background}></img>
      <div className="homepage__image__input-element">
        <Input name="SearchArea" placeholder="Search climbing area" />
        <span className="homepage__image__input-element--button">
          <Button label="Search" color="green" />
        </span>
      </div>
    </div>
  );
};

export default HomePage;
