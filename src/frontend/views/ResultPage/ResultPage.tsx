import React from "react";

import { Boulder } from "../../../models/common";
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
  return (
    <BoulderGrid
      boulderData={searchedBoulders}
      fetchedBoulders={fetchedBoulders}
      setFetchedBoulders={setFetchedBoulders}
      setSearchedBoulders={setSearchedBoulders}
    />
  );
};

export default ResultPage;
