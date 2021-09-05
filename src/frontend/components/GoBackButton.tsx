import React from "react";
import { Link } from "react-router-dom";

export const GoBackButton = ({ }) => {
  //Goes back to the starting page from the database section
  return (
    <div>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};