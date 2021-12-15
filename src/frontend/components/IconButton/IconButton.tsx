import React, { MouseEventHandler } from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";

interface IconButtonProps {
  icon?: IconProp;
  label?: String;
  linkTo?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const IconButton = ({
  icon,
  label,
  linkTo,
  onClick,
}: IconButtonProps) => {
  return (
    <Link
      className="button__link"
      to={linkTo ? linkTo : window.location.pathname}
    >
      <button className="iconButton" onClick={onClick}>
        <span className="iconButton--icon">
          <FontAwesomeIcon icon={icon} />
        </span>
        <label className="iconButton--label">{label}</label>
      </button>
    </Link>
  );
};
