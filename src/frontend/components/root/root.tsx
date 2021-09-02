import React, { useState } from "react";
import Area from "../SearchArea";
import { searchBoulders } from "./toMiddleware";
import { BasicTable } from "../Table";

const root = () => {
  const [boulder, setBoulder] = useState([]);

  return (
    <div className="Root">
      <h1>Search Area...</h1>
      <Area onSearch={searchBoulders(setBoulder)} />
      <h2>...then click on a Boulder to add it to the list of climbed boulders:</h2>
        <BasicTable
          setData={boulder}
        />
    </div>
  );
};

export default root;