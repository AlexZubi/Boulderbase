import React from "react";
import find from "lodash/find";

import { Boulder } from "../../../models/common";
import { IconButton } from "../../components/IconButton/IconButton";
import {
  insertUserBoulder,
  deleteUserBoulder,
  retrieveUserBoulders,
} from "../../helper/requests";

interface BoulderRowProps {
  boulder: Boulder;
  fetchedBoulders?: Boulder[];
  setFetchedBoulders?: (boulder: Boulder[]) => void;
  onDelete?: (boulder: Boulder) => void;
}

export const Boulders = ({
  boulder,
  onDelete,
  fetchedBoulders,
  setFetchedBoulders,
}: BoulderRowProps) => {
  return (
    <div className="boulder__cells">
      <div className="boulder__cell">
        {boulder.name}
        {onDelete ? (
          <IconButton
            icon="coffee"
            onClick={() => {
              onDelete(boulder);
              deleteUserBoulder(boulder.boulder_id);
            }}
          />
        ) : (
          <div
            onClick={() => {
              insertUserBoulder(boulder.boulder_id)
                .then(() => retrieveUserBoulders())
                .then((boulders) => setFetchedBoulders(boulders));
            }}
          >
            {find(fetchedBoulders, boulder) ? (
              <IconButton icon="coffee" />
            ) : (
              <IconButton icon="check-square" />
            )}
          </div>
        )}
      </div>
      <div className="boulder__cell">{boulder.grade}</div>
      <div className="boulder__cell">{boulder.area}</div>
    </div>
  );
};
