import { useDispatch } from "react-redux";
import { connectSocket, disconnectSocket } from "../redux/reducers/socket";
import { io } from "socket.io-client";
import { useEffect } from "react";
import config from "./config";

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io(config.server_url, {
      transports: ["websocket"], // You can also specify other transports like 'polling'
    });
    socket.on("connect", () => {
      dispatch(connectSocket(socket)); // Store the socket instance in Redux
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      dispatch(disconnectSocket()); // Remove socket instance from Redux
    });

    socket.on("error", (error) => {
      console.log("Socket error:", error);
    });
  }, []);
  return null;
};
