import React from "react";
import PropTypes from "prop-types";

export const GetButton = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Show climbed boulders</button>
    </div>
  );
};

GetButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
