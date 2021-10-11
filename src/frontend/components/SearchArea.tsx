import React, { useState } from "react";
import { Boulder } from "./types/common";
import "./styles/table.css";

interface SearchProp {
  onSearch?: (boulder: Boulder[]) => void;
}

export const Area = ({ onSearch }: SearchProp) => {
  const [area, setArea] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //Gets the boulders from the second section of a supplied area
    e.preventDefault();
    if (!area) {
      alert("Please add an area");
      return;
    }
    function getBoulders(area: string) {
      const URL = "http://localhost:3000/boulder/" + area;
      const boulders = fetch(URL, {
        method: "GET",
        credentials: "same-origin",
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => console.log(err.message));
      return boulders;
    }
    await getBoulders(area)
      .then((res) => {
        if (res == null) {
          throw Error("Could not contact server");
        }
        if (res.length === 0) {
          throw Error("Area not found");
        }
        setError(null);
        onSearch(res);
      })
      .catch((err) => {
        setError(err.message);
      });
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
      {error && <div className={"searchError"}>{error}</div>}
    </form>
  );
};
export default Area;
