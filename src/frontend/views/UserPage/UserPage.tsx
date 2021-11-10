import React from "react";

import Header from "../../components/header/Header";
import { Boulder } from "../../../models/common"
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
      <Header title="Results">
        <Button label="Go Back" linkTo="/" />
      </Header>
      <BoulderGrid boulderData={fetchedBoulders}/>
    </>
  );
};

export default UserPage;
