import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

import "./Button.scss";

interface ButtonProps {
  className?: string;
  label: string;
  linkTo?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ className, label, linkTo, onClick }: ButtonProps) => {

  return (
    <Link to={linkTo}>
      <button className={className} onClick={onClick}>
        <span className="button__label">{label}</span>
      </button>
    </Link>
  );
};
