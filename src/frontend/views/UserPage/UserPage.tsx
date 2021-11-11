import React from "react";

import { Boulder } from "../../../models/common";
import { BoulderGrid } from "../../components/BoulderGrid/BoulderGrid";
import { Button } from "../../components/Button/Button";

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
    <>
      <Button label="Go Back" linkTo="/" />
      <BoulderGrid
        boulderData={fetchedBoulders}
        deleteBoulder={deleteBoulder}
      />
    </>
  );
};

export default UserPage;
