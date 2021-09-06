import React, { useState } from "react";
import "./styles/table.css";

const Area = ({ onSearch }) => {
  const [text, setArea] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //Gets all the boulders from the webscraper
    e.preventDefault();

    if (!text) {
      alert("Please add an area");
      return;
    }
    onSearch(text);
    setArea("");
  };
  return (
    <form className="area-form" onSubmit={onSubmit}>
      <div className="form-control">
        <input
          type="text"
          placeholder="Area"
          value={text}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>
    </form>
  );
};
export default Area;
