import { useState } from "react";
import Header from "../../components/header/Header";
import { Area } from "../../components/SearchArea";
import { ShowClimbedButton } from "../../components/ShowClimbedButton";
import { Table } from "../../components/Table";
import { fetchDatabase } from "../../helper/requestHelper";
import { BoulderType } from "../../components/types/boulderType";

interface HomePageProps {
  fetchedBoulders: BoulderType[];
  setFetchedBoulders: (boulders: BoulderType[]) => void;
  searchedBoulders: BoulderType[];
  setSearched: (boulders: BoulderType[]) => void;
}

const HomePage = ({
  fetchedBoulders,
  searchedBoulders,
  setFetchedBoulders,
  setSearched,
}: HomePageProps) => {
  const onClick = () => {
    fetchDatabase(setFetchedBoulders);
  };

  return (
    <>
      <Header title="Search Area...">
        <Area onSearch={setSearched} />
        <ShowClimbedButton onClick={onClick} />
      </Header>
      {searchedBoulders ? (
        <Table
          boulderData={searchedBoulders}
          fetchedBoulders={fetchedBoulders}
          headingColumns={["Name", "Grade"]}
        />
      ) : null}
    </>
  );
};

export default HomePage;
