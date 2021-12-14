import React from "react";

var background = require("../../assets/Background1.jpg");

import { Boulder } from "../../../models/common";
import { BoulderGrid } from "../../partials/BoulderGrid/BoulderGrid";

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
      <img className="homepage__background" src={background}></img>
    </div>
  );
};

export default HomePage;
