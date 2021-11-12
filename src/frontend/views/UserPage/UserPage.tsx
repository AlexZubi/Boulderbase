import React from "react";

import { Boulder } from "../../../models/common";
import { BoulderGrid } from "../../components/BoulderGrid/BoulderGrid";

interface ResultsPageProps {
  fetchedBoulders: Boulder[];
  setFetchedBoulders: (boulders: Boulder[]) => void;
}

const UserPage = ({
  fetchedBoulders,
  setFetchedBoulders,
}: ResultsPageProps) => {
  const deleteBoulder = (boulderToDelete: Boulder) => {
    const newFetch = fetchedBoulders.filter((boulder) => {

      return boulder != boulderToDelete;
    });
    setFetchedBoulders(newFetch);
  };

  return (
      <BoulderGrid
        boulderData={fetchedBoulders}
        deleteBoulder={deleteBoulder}
      />
  );
};

export default UserPage;
