import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "../../pages/HomePage/HomePage";
import { Boulder } from "../../../models/common"
import UserPage from "../../pages/userPage/userPage";

const root = () => {
  const [searchedBoulders, setSearched] = useState<Boulder[]>(null);
  const [fetchedBoulders, setFetchedBoulders] = useState<Boulder[]>([]);

  return (
    <Router>
      <div className="Root">
        <Route
          path="/"
          exact
          render={() => (
            <HomePage
              setFetchedBoulders={setFetchedBoulders}
              searchedBoulders={searchedBoulders}
              setSearched={setSearched}
              fetchedBoulders={fetchedBoulders}
            />
          )}
        />
        <Route
          path="/userTable"
          exact
          render={() => (
            <UserPage
              fetchedBoulders={fetchedBoulders}
              setFetchedBoulders={setFetchedBoulders}
            />
          )}
        />
      </div>
    </Router>
  );
};

export default root;
