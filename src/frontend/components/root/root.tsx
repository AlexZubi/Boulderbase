import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "../../pages/HomePage/HomePage";
import { BoulderType } from "../../components/types/boulderType";
import UserPage from "../../pages/userPage/userPage";

const root = () => {
  const [searchedBoulders, setSearched] = useState<BoulderType[]>(null);
  const [fetchedBoulders, setFetchedBoulders] = useState<BoulderType[]>([]);
  console.log({ searchedBoulders });

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
