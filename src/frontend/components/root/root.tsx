import React, { useState } from "react";
import Area from "../SearchArea";
import { searchBoulders, fetchDatabase } from "./toMiddleware";
import { SearchTable } from "../SearchTable";
import { GetButton } from "../GetButton";
import { DatabaseTable } from "../DatabaseTable";

const root = () => {
  const [searchedBoulder, setSearched] = useState([]); //Sets the state to the result of the webscraper
  const [fetchedBoulders, setFetch] = useState([]); //Sets the state to the fetched entries of the climbs database

  const onClick = () => {
    fetchDatabase(setFetch);
  };

  return (
    <div className="Root">
      <h1>Search Area...</h1>
      <Area onSearch={searchBoulders(setSearched)} />
      <GetButton onClick={onClick} />
      <h2>Click on a Boulder to add it to the list of climbed boulders:</h2>
      <SearchTable setData={searchedBoulder} />
      <DatabaseTable setData={fetchedBoulders} />
    </div>
  );
};

export default root;
