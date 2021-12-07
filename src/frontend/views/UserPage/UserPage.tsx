import React from "react";

import { Boulder } from "../../../models/common";
import { BoulderGrid } from "../../partials/BoulderGrid/BoulderGrid";

interface ResultsPageProps {
  fetchedBoulders: Boulder[];
  setFetchedBoulders: (boulders: Boulder[]) => void;
}

const UserPage = ({
  fetchedBoulders,
  setFetchedBoulders,
}: ResultsPageProps) => {
  const handleDelete = (boulderToDelete: Boulder) => {
    const newFetch = fetchedBoulders.filter((boulder) => {
      return boulder != boulderToDelete;
    });
    setFetchedBoulders(newFetch);
  };

  return (
    <BoulderGrid boulderData={fetchedBoulders} deleteBoulder={handleDelete} />
  );
};

export default UserPage;
