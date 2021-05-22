import React, { useEffect, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import Word from "../Word";
import "./index.css";
import MemberList from "./MemberList";

const CanvasSegment = ({
  turn,
  user,
  time,
  passTurn,
  members,
  word,
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
      <h1 style={{backgroundColor:'#1e1e1f',fontSize:'20px',padding:'5px'}}>Time: {time}</h1>
      <MemberList members={members} turn={turn} />
      <Word word={word}/>
      {/* Primary canvas, Player can draw here */}
      {turn && turn.id === user.id && (
        <CanvasDraw
          canvasHeight={"100%"}
          canvasWidth={"100%"}
          onChange={(canvas) => sendCanvasData(canvas.getSaveData())}
        />
      )}


      {/* Passive canvas, Player can not draw here */}
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
