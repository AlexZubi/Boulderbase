import React, { useState, useEffect } from "react";

const Area = ({ onSearch }) => {

  const [text, setArea] = useState("");

  useEffect(() => {
    console.log(text);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        <label>Enter Area:</label>
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
