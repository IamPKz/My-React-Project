import React, { useState } from "react";

const Test = () => {
  let numgen = 0;
  const [table, setTable] = useState();
  const giventable = [];
  const createtable = (numgen) => {
    let tablex = [];
    let tabley = [];
    for (let i = 0; i < numgen; i++) {
      tablex.push(
        <div>
          <input placeholder={"value x" + (i + 1)} />
        </div>
      );
      tabley.push(
        <div>
          <input placeholder={"value y" + (i + 1)} />
        </div>
      );
    }
    giventable.push({ a: tablex, b: tabley });
  };

  const result = () => {
    console.log("numgen: ", numgen);
    console.log(giventable);
    return (
      <div>
        {giventable.map((data) => (
          <div style={{ display: "flex" }}>
            <div>{data.a}</div>
            <div>{data.b}</div>
          </div>
        ))}
      </div>
    );
  };

  const inputnum = (event) => {
    numgen = event.target.value;
    console.log(numgen);
    createtable(numgen);
    setTable(result());
  };
  return (
    <div>
      Number
      <input onChange={inputnum} />
      {table}
    </div>
  );
};
export default Test;