import React, { useEffect, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import "./index.css";

const CanvasSegment = ({
  turn,
  user,
  passTurn,
  canvasData = "",
  sendCanvasData = (data) => {
    console.log("data", data);
  },
}) => {
  const canvas = useRef();
  useEffect(() => {
    if (canvas.current) {
      if (canvasData) {
        canvas.current.loadSaveData(canvasData);
      } else {
        canvas.current.clear();
      }
    }
  }, [canvasData]);
  return (
    <div className="CanvasSegment">
      <h1>Panda Draw Clone</h1>
      <span className="controls"></span>
      {turn && turn.id === user.id && (
        <CanvasDraw
          canvasHeight={"100%"}
          canvasWidth={"100%"}
          onChange={(canvas) => sendCanvasData(canvas.getSaveData())}
        />
      )}
      <br />
      {turn && turn.id !== user.id && (
        <CanvasDraw
          canvasHeight={"100%"}
          canvasWidth={"100%"}
          style={{ pointerEvents: "none" }}
          ref={canvas}
        />
      )}
      {!turn && <button onClick={passTurn}>Start</button>}
      {turn && turn.id === user.id && (
        <button onClick={passTurn}>Pass Turn</button>
      )}
      {turn && turn.id !== user.id && (
        <h1 style={{ background: "#444" }}>Wait for your turn</h1>
      )}
    </div>
  );
};

export default CanvasSegment;
