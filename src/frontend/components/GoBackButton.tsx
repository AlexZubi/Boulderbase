import React from "react";
import { Link } from "react-router-dom";
import "./styles/button.css";

export const GoBackButton = ({}) => {
  return (
    <Link to="/">
      <button className={"backBtn"}>Go Back</button>
    </Link>
  );
};
