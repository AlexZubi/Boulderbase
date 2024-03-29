import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

import "./Button.scss";

interface ButtonProps {
  color?: "green";
  label: string;
  linkTo?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  color = "green",
  label,
  linkTo,
  onClick,
}: ButtonProps) => {
  const className = `button button--${color} `;

  return (
    <Link
      className="button__link"
      to={linkTo ? linkTo : window.location.pathname}
    >
      <button className={className} onClick={onClick}>
        <span className="button__label">{label}</span>
      </button>
    </Link>
  );
};
