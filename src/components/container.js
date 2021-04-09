import React, { useState, useEffect } from "react";
import Board from "./board";
import "./container.css";

const Container = () => {
  // const [color, setColor] = useState("#000000");
  // const [size, setSize] = useState(5);

  // const changeColor = (e) => {
  //   setColor(e.target.value);
  // };

  // const changeSize = (e) => {
  //   setSize(e.target.value);
  // };

  return (
    <div className="container">
      {/* <div class="tools-section">
        <div className="color-picker-container">
          Select Brush Color : &nbsp;
          <input type="color" value={color} onChange={changeColor} />
        </div>

        <div className="brushsize-container">
          Select Brush Size : &nbsp;
          <select value={size} onChange={changeSize}>
            <option> 5 </option>
            <option> 10 </option>
            <option> 15 </option>
            <option> 20 </option>
            <option> 25 </option>
            <option> 30 </option>
          </select>
        </div>
      </div> */}

      <div className="board-container">
        <Board />
      </div>
    </div>
  );
};

export default Container;
