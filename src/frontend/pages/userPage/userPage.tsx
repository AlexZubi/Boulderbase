import React from "react";

import Header from "../../components/header/Header";
import { GoBackButton } from "../../components/GoBackButton";
import { Boulder } from "../../../models/common"
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
    <>
      <Header title="Results">
        <GoBackButton />
      </Header>
      <BoulderGrid boulderData={fetchedBoulders}/>
    </>
  );
};

export default UserPage;
