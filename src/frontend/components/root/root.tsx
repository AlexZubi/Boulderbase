import React from "react";
import { isConstructorDeclaration } from "typescript";
import Area from "../SearchArea";
import { Table } from "../Table"

//Takes the entered Area and passes it to the searchBoulders function
const searchArea = (area: string) => {
  searchBoulders(area);
};

//Uses the scraper on the Server to return the boulders of the entered area as an array of objects
const searchBoulders = async (area: string) => {
  try {
    let URL = "http://localhost:3000/?crag=" + area;

    const res = await fetch(URL, { method: "GET", credentials: "same-origin" });
    const data = await res.json();
    console.log(data)

  } catch (err) {
    console.log(err);
  }
};

const root = () => {
  return (
    <div className="Root">
      <h1>List of Boulders</h1>
      <Area onSearch={searchArea} />
      <Table/>
    </div>
  );
};

export default root;
