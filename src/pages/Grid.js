import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

function Landing() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    // Update the document title using the browser API
  }, [grid]);

  let createGrid = (n, m) => {
    let cubeObj = {
      row: 0,
      col: 0,
      owner: "abc",
      colour: "blue",
    };

    let tempGrid = [];

    for (let i = 0; i < n; i++) {
      let tempArray = [];
      for (let j = 0; j < m; j++) {
        tempArray.push({ ...cubeObj, row: i, col: j });
      }
      tempGrid.push(tempArray);
    }
    console.log(tempGrid);
    setGrid(tempGrid);
  };

  let changeColour = (row, col, user, grid, colour = "blue") => {
    grid[row][col].colour = colour;
    grid[row][col].owner = user;
    grid[row][col].row = 4;
    console.log(grid);
    setGrid(grid);
  };

  return (
    <div>
      <Header />
      <div onClick={() => createGrid(120, 120)}> Create</div>
      <div onClick={() => changeColour(0, 0, "luis@kadi.club", grid, "red")}>
        {" "}
        Change Colour
      </div>
      <div onClick={() => console.log(grid[0])}> Console</div>
      <div className="w-full h-full ">
        {grid !== undefined && (
          <div className=" rounded shadow-lg self-center  overflow-auto ">
            {grid.map((row, key) => (
              <div key={key} className="flex flex-row h-full  overflow">
                {row.map((col) => (
                  <div
                    className={`flex-col hover:border-black border-1  z-10 hover:scale-110 hover:shadow-lg cursor-pointer  w-2 h-2 bg-${col.colour}-600 hover:bg-${col.colour}-300  text-center`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Landing;
