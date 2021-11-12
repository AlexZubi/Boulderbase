import React from "react";

import { Boulder } from "../../../models/common";
import { BoulderGrid } from "../../components/BoulderGrid/BoulderGrid";

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
        <BoulderGrid
          boulderData={searchedBoulders}
          fetchedBoulders={fetchedBoulders}
          setFetchedBoulders={setFetchedBoulders}
          setSearchedBoulders={setSearchedBoulders}
        />
  );
};

export default HomePage;
