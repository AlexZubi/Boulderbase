import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "../HomePage/HomePage"
import UserPage from "../UserPage/UserPage";
import { Boulder } from "../../../models/common";

import "./Main.scss"

const Main = () => {
  const [fetchedBoulders, setFetchedBoulders] = useState<Boulder[]>([]);
  const [searchedBoulders, setSearchedBoulders] = useState<Boulder[]>(null);

  return (
    <Router>
      <div className="main">
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <HomePage
                searchedBoulders={searchedBoulders}
                setSearchedBoulders={setSearchedBoulders}
                setFetchedBoulders={setFetchedBoulders}
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
        </Switch>
      </div>
    </Router>
  );
};

export default Main;
