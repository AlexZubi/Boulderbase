import React, { useState } from "react";
import { Area } from "../SearchArea";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { fetchDatabase } from "./toMiddleware";
import { Table } from "../Table";
import { ShowClimbedButton } from "../GetButton";
import { GoBackButton } from "../GoBackButton";
import columnsHelper from "./columnsHelper";

const root = () => {
  const [searchedBoulder, setSearched] = useState([]); //Sets the state to the result of the webscraper
  const [fetchedBoulders, setFetch] = useState([]); //Sets the state to the fetched entries of the climbs database
  const search = 0
  const fetch = 1

  const onClick = () => {
    fetchDatabase(setFetch);
  };

  return (
    <Router>
      <div className="Root">
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              <h1>Search Area...</h1>
              <Area onSearch={setSearched} />
              <ShowClimbedButton onClick={onClick} />

              <Table data={searchedBoulder} columns={columnsHelper(search)} />
            </>
          )}
        />
        <Route
          path="/database"
          exact
          render={(props) => (
            <>
              <GoBackButton />
              <Table data={fetchedBoulders} columns={columnsHelper(fetch)} />
            </>
          )}
        />
      </div>
    </Router>
  );
};

export default root;
