import React, { useState, useEffect, useRef } from "react";
import "./board.css";
import io from "socket.io-client";
let socket;
const Board = () => {
  var ctx2 = useRef();

  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(5);
  const [mode, setMode] = useState(true);

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const changeSize = (e) => {
    setSize(e.target.value);
  };

  // useEffect(() => {
  //   socket = io.connect("/");
  //   console.log(socket);
  //   socket.on("canvas-data", (data) => {
  //     var image = new Image();
  //     image.onload = () => {
  //       ctx2.current.getContext("2d").drawImage(image, 0, 0);
  //     };
  //     image.src = data;
  //   });
  // }, [mode]);
  useEffect(() => {
    canvasDraw();
    socket = io.connect("https://colabdraw-backend.herokuapp.com/", {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10001,
      transports: ["websocket"],
    });
    console.log(socket);
    socket.on("canvas-data", (data) => {
      var image = new Image();
      image.onload = () => {
        ctx2.current.getContext("2d").drawImage(image, 0, 0);
      };
      image.src = data;
    });
    // ctx.strokeStyle = color;
    // ctx.lineWidth = size;
  }, []);
  useEffect(() => {
    var ctx = ctx2.current.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
  }, [color, size]);

  const canvasDraw = () => {
    // console.log(ctx2.current);
    // var canvas = document.querySelector("#board");
    // console.log(canvas);
    var ctx = ctx2.current.getContext("2d");
    // var ctx = ctx;

    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    ctx2.current.width = parseInt(sketch_style.getPropertyValue("width"));
    ctx2.current.height = parseInt(sketch_style.getPropertyValue("height"));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    ctx2.current.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    // console.log(size, color);
    ctx.lineWidth = size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    ctx2.current.addEventListener(
      "mousedown",
      function (e) {
        ctx2.current.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    ctx2.current.addEventListener(
      "mouseup",
      function () {
        ctx2.current.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    var root = {};
    var onPaint = function () {
      // console.log(mode);
      // if (mode === "erase") {
      //   ctx.globalCompositeOperation = "destination-out";
      // } else {
      //   ctx.globalCompositeOperation = "source-over";
      // }
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (root.timeout !== undefined) clearTimeout(root.timeout);
      root.timeout = setTimeout(function () {
        var base64ImageData = ctx2.current.toDataURL("image/png");
        socket.emit("canvas-data", base64ImageData);
      }, 1000);
    };
  };

  return (
    <div style={{ height: "100%" }}>
      <div className="tools-section">
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
      </div>
      <div>
        <button onClick={() => setMode("pen")}>Pen</button>
        <button onClick={() => setMode((prev) => !prev)}>Clear all</button>
      </div>

      <div className="sketch" id="sketch" style={{ height: "93%" }}>
        <canvas className="board" id="board" ref={ctx2}></canvas>
      </div>
    </div>
  );
};

export default Board;
