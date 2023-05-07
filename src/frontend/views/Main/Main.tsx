import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "../HomePage/HomePage";
import ResultPage from "../ResultPage/ResultPage";
import { Boulder } from "../../../models/common";
import { retrieveUserBoulders } from "../../helper/requests";

const Main = () => {
  const [fetchedBoulders, setFetchedBoulders] = useState<Boulder[]>([]);
  const [searchedBoulders, setSearchedBoulders] = useState<Boulder[]>(null);

  useEffect(() => {
    retrieveUserBoulders().then((boulders) => setFetchedBoulders(boulders));
  }, []);

  return (
    <Router>
      <div className="main">
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <HomePage setSearchedBoulders={setSearchedBoulders} />
            )}
          />
          <Route
            path="/resultPage"
            exact
            render={() => (
              <ResultPage
                searchedBoulders={searchedBoulders}
                setSearchedBoulders={setSearchedBoulders}
                fetchedBoulders={fetchedBoulders}
                setFetchedBoulders={setFetchedBoulders}
              />
            )}
          />
          <Route
                path="/userPage"
                exact
                render={() => (
                  <ResultPage
                    searchedBoulders={fetchedBoulders}
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
