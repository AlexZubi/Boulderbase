import React, { MouseEventHandler } from "react";

import buildClassName from '../../helper/buildClassName';
import { Button } from "../Button/Button";

import "./BoulderRow.scss"

interface BoulderHeaderRowProps {
  sortByRow?: MouseEventHandler<HTMLButtonElement>;
}

const sortByRow = () => {
  
}

export const BoulderHeaderRow = ({sortByRow}: BoulderHeaderRowProps) => {

    
  return (
    <div className={buildClassName("boulder-row", { header: true }, "boulder-row__cells")}>
      <Button className="boulder-row__cell" label="Name" onClick={() => {label}}/>
      <Button className="boulder-row__cell" label="Grade" onClick={() => sortByRow}/>
      <Button className="boulder-row__cell" label="Area" onClick={() => sortByRow}/>
    </div>
  );
};
