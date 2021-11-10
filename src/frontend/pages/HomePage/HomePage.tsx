import React, { ChangeEvent, useState } from "react";

import Header from "../../components/header/Header";
import { retrieveUserBoulders } from "../../helper/requests";
import { Boulder } from "../../../models/common";
import { BoulderGrid } from "../../components/BoulderGrid/BoulderGrid";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { retrieveBoulders } from "../../helper/requests";

interface HomePageProps {
  setFetchedBoulders: (boulders: Boulder[]) => void;
}

const HomePage = ({ setFetchedBoulders }: HomePageProps) => {
  const [searchedArea, setSearchedArea] = useState(null);
  const [searchedBoulders, setSearchedBoulders] = useState(null);

  const handleUserRequest = () => {
    retrieveUserBoulders(setFetchedBoulders);
  };

  const handleAreaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchedArea(event.target.value);
  };

  const handleAreaSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchedArea) {
      alert("Please add an area");

      return;
    }
    retrieveBoulders(searchedArea)
      .then((boulder) => {
        setSearchedBoulders(boulder);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <>
      <Header title="Search Area...">
        <form className="area-form" onSubmit={handleAreaSubmit}>
          <Input
            name="searchArea"
            placeholder="Area"
            onChange={handleAreaChange}
          />
        </form>
        <Button
          label="Show climbed Boulders"
          onClick={handleUserRequest}
          linkTo="/userTable"
        />
      </Header>
      {searchedBoulders ? <BoulderGrid boulderData={searchedBoulders} /> : null}
    </>
  );
};

export default HomePage;
