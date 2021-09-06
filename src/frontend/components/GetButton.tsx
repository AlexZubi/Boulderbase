import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles/table.css";

export const ShowClimbedButton = ({ onClick }) => {
  //Gets the so-far climbed boulders and stores them in an useState in root
  return (
    <div>
      <Link to="/database">
        <button className='btn' onClick={onClick}>Show climbed boulders</button>
      </Link>
    </div>
  );
};

ShowClimbedButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
