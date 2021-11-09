import React from "react";

import Header from "../../components/header/Header";
import { Area } from "../../components/SearchArea";
import { ShowClimbedButton } from "../../components/ShowClimbedButton";
import { retrieveUserBoulders } from "../../helper/requestHelper";
import { Boulder } from "../../../models/common"
import { BoulderGrid } from "../../components/BoulderGrid/BoulderGrid";

interface HomePageProps {
  fetchedBoulders: Boulder[];
  setFetchedBoulders: (boulders: Boulder[]) => void;
  searchedBoulders: Boulder[];
  setSearched: (boulders: Boulder[]) => void;
}

const HomePage = ({
  fetchedBoulders,
  searchedBoulders,
  setFetchedBoulders,
  setSearched,
}: HomePageProps) => {
  const onClick = () => {
    retrieveUserBoulders(setFetchedBoulders);
  };

  return (
    <>
      <Header title="Search Area...">
        <Area onSearch={setSearched} />
        <ShowClimbedButton onClick={onClick} />
      </Header>
      {searchedBoulders ? (
        <BoulderGrid boulderData={searchedBoulders}/>
      ) : null}
    </>
  );
};

export default HomePage;
