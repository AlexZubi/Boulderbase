import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "../../pages/HomePage/HomePage";
import { Boulder } from "../../../models/common";
import UserPage from "../../pages/userPage/userPage";

const root = () => {
  const [fetchedBoulders, setFetchedBoulders] = useState<Boulder[]>([]);

  return (
    <Router>
      <div className="Root">
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <HomePage
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

export default root;
