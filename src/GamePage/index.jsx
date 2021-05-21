import React, { useEffect, useRef, useState } from "react";
import socketClient from "socket.io-client";
import { v4 as uuid4 } from "uuid";
import CanvasSegment from "./CanvasSegment";
import ChatWindow from "./ChatWindow";
import "./index.css";
const socketPromise = require("../socket.io-promise").promise;

const GameScreen = () => {
  const socket = useRef(null);
  const [members, setMembers] = useState([]);
  const [turn, setTurn] = useState(false);
  const [canvasData, setCanvasData] = useState('');
  const [roomId, setRoomId] = useState(0);
  const [user, setUser] = useState({ id: uuid4() });
  const [messages, setMessages] = useState([
    {
      EIO: "3",
      id: "b66cda87-bfe0-4c6b-8bac-ca9be690d30d",
      message: "Hello everyone",
      name: "badal",
      roomId: "any",
      sender: "894fa69c-719f-45e3-a5c8-75f7e5332de7",
      time: 1621620935213,
      transport: "websocket",
    },
  ]);

  const initPandaClone = () => {
    const room =prompt('Enter Room Id')
    // const room = "any";
    setRoomId(room);
    const name =prompt('Enter User name')
    // const name = "badal";
    const newUser = { ...user, name };
    setUser(newUser);
    console.log("user", user);
    console.log("roomId", roomId);
    const opts = {
      path: "/server",
      transports: ["websocket"],
      query: {
        roomId: room,
        ...newUser,
      },
    };
    const serverUrl = `http://localhost:2626`;
    socket.current = socketClient(serverUrl, opts);
    socket.current.request = socketPromise(socket.current);
    setupListeners(room);
  };
  const setupListeners = (room) => {
    socket.current.on("connect", async () => {
      console.log("socket.current: ", socket.current);
      await socket.current.request("room", { roomId: room });
    });
    socket.current.on("disconnect", () => {
      console.log("Disconnected from websocket");
    });
    socket.current.on("peerDisconnected", (data) => {
      console.log("Disconnected peer", data);
      setMembers((members) => [
        ...members.filter((member) => member.id !== data.id),
      ]);
    });
    socket.current.on("newPeerConnected", (data) => {
      setMembers((members) => [...members, data.user]);
    });
    socket.current.on("joined", (data) => {
      setMembers([...data.userList]);
    });
    socket.current.on("message", (data) => {
      setMessages((messages) => [...messages, data]);
    });
    socket.current.on("canvas", (data) => {
      console.log('canvas data: ', data);
      setCanvasData(data)
    });
    socket.current.on("turn", (data) => {
      console.log('turn data: ', data);
      setTurn(data)
    });
  };
  useEffect(initPandaClone, []);
  const passTurn =  () => {
    console.log('passTurn: ');
    socket.current.emit("passTurn");
  }
  const sendMessage = (message) => {
    socket.current.emit("message", { message });
  };
  const sendCanvasData= (data) => {
    socket.current.emit("canvas", data);
  }
  return (
    <div className="GameSreen">
      <CanvasSegment turn={turn} user={user} passTurn={passTurn} sendCanvasData={sendCanvasData} canvasData={canvasData}/>
      <ChatWindow sendMessage={sendMessage} user={user} messages={messages} />
    </div>
  );
};

export default GameScreen;
