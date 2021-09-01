import React, { Fragment, useState } from "react";
import Area from "../SearchArea";
import { searchBoulders } from "./searchFunctions";
import Table from "../Table";

const root = () => {
  const [boulder, setBoulder] = useState([]);

  return (
    <div className="Root">
      <h1>Search Area:</h1>
      <Area onSearch={searchBoulders(setBoulder)} />
      <Fragment>
        <Table
          tableData={boulder}
          headingColumns={["Name", "Grade"]}
          title="Boulder:"
        />
      </Fragment>
    </div>
  );
};

export default root;
