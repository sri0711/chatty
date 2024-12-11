import { useDispatch } from "react-redux";
import {
  connectSocket,
  disconnectSocket,
  updateConnectedState,
} from "@/src/redux/reducers/socket";
import { io } from "socket.io-client";
import { useEffect } from "react";
import config from "@/src/helpers/config";

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io(config.server_url, {
      transports: ["websocket"], // You can also specify other transports like 'polling'
    });
    socket.on("connect", () => {
      dispatch(connectSocket(socket)); // Store the socket instance in Redux
      dispatch(updateConnectedState(true));
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      dispatch(disconnectSocket()); // Remove socket instance from Redux
      dispatch(updateConnectedState(false));
    });

    socket.on("error", (error) => {
      console.log("Socket error:", error);
    });
  }, []);
  return null;
};
