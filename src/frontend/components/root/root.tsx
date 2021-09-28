import React, { useState } from "react";
import { Area } from "../SearchArea";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { fetchDatabase } from "../../helper/requestHelper";
import { Table } from "../Table";
import { ShowClimbedButton } from "../ShowClimbedButton";
import { GoBackButton } from "../GoBackButton";
import { BoulderType } from "../types/boulderType";

const root = () => {
  const [searchedBoulders, setSearched] = useState<BoulderType[]>([]); //Sets the state to the result of the webscraper
  const [fetchedBoulders, setFetch] = useState<BoulderType[]>([]); //Sets the state to the fetched entries of the "boulders" database
  const [toDelete, setDelete] = useState<BoulderType>(null);
  const onClick = () => {
    fetchDatabase(setFetch);
  };
  if (toDelete) {
    const newFetch = fetchedBoulders.filter((boulder) => {
      return boulder != toDelete;
    });
    setFetch(newFetch);
    setDelete(null);
  }
  return (
    <Router>
      <div className="Root">
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              <h1 className={"header"}>Search Area...</h1>
              <Area onSearch={setSearched} />
              <ShowClimbedButton onClick={onClick} />
              <Table
                boulderData={searchedBoulders}
                headingColumns={["Name", "Grade"]}
              />
            </>
          )}
        />
        <Route
          path="/table"
          exact
          render={(props) => (
            <>
              <GoBackButton />
              <Table
                boulderData={fetchedBoulders}
                headingColumns={["Name", "Grade", "Area"]}
                deleteBoulder={setDelete}
              />
            </>
          )}
        />
      </div>
    </Router>
  );
};

export default root;
