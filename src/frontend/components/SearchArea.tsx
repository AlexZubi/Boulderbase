import React, { useState } from "react";
import "./styles/table.css";

const Area = ({ onSearch }) => {
  const [area, setArea] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //Gets all the boulders from the webscraper
    e.preventDefault();

    if (!area) {
      alert("Please add an area");
      return;
    }
    onSearch(area);
    setArea("");
  };
  return (
    <form className="area-form" onSubmit={onSubmit}>
      <div className="form-control">
        <input
          type="text"
          placeholder="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>
    </form>
  );
};
export default Area;
