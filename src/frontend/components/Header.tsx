import React from "react";

interface HeaderProp {
  title: string;
}

const Header = ({ title }: HeaderProp) => {
  return (
    <header className="header">
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
