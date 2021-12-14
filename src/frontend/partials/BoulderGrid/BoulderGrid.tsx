import React, { ChangeEvent, useState } from "react";
import { orderBy } from "lodash";

import { BoulderHeaderRow } from "../BoulderHeaderRow/BoulderHeaderRow";
import { Boulder } from "../../../models/common";
import { BoulderRow } from "../BoulderRow/BoulderRow";
import { tableHeader } from "../../constants/labels";
import { Input } from "../../components/Input/Input";
import { retrieveBoulders } from "../../helper/requests";

interface BoulderGridProps {
  boulderData?: Boulder[];
  setSearchedBoulders?: (boulder: Boulder[]) => void;
  fetchedBoulders?: Boulder[];
  setFetchedBoulders?: (boulder: Boulder[]) => void;
  deleteBoulder?: (boulder: Boulder) => void;
}

export const BoulderGrid = ({
  boulderData,
  setSearchedBoulders,
  fetchedBoulders,
  setFetchedBoulders,
  deleteBoulder,
}: BoulderGridProps) => {
  const [sortedData, setSortedData] = useState([]);
  const [sortingKey, setSortingKey] = useState(null);
  const [searchedArea, setSearchedArea] = useState(null);

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

  const handleSort = (key: string) => {
    if (sortingKey !== key) {
      setSortedData(orderBy(boulderData, key.toLowerCase(), ["asc"]));
      setSortingKey(key);
    } else {
      setSortedData(orderBy(boulderData, key.toLowerCase(), ["desc"]));
      setSortingKey(null);
    }
  };

  if (sortedData.length > 0) {
    boulderData = [...sortedData];
  }

  return (
    <div className="boulder-grid">
      <BoulderHeaderRow
        labels={tableHeader}
        onSort={handleSort}
        setFetchedBoulders={setFetchedBoulders}
      />
      <form className="boulder-grid__search-bar" onSubmit={handleAreaSubmit}>
        <Input
          name="searchArea"
          placeholder="Search area..."
          onChange={handleAreaChange}
        />
      </form>
      <div className="boulder-grid__rows">
        {boulderData?.map((boulder, index) => (
          <BoulderRow
            key={index}
            boulder={boulder}
            onDelete={deleteBoulder}
            fetchedBoulders={fetchedBoulders}
            setFetchedBoulders={setFetchedBoulders}
          />
        ))}
      </div>
    </div>
  );
};
