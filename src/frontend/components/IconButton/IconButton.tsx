import _ from "lodash";
import React, { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./IconButton.scss";

interface IconButtonProps {
  icon?: IconProp;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const IconButton = ({ icon, onClick }: IconButtonProps) => {
  
  return (
    <button className="iconButton" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
