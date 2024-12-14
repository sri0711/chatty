import { useDispatch, useSelector } from "react-redux";
import {
  connectSocket,
  disconnectSocket,
  updateConnectedState,
} from "@/src/redux/reducers/socket";
import { io } from "socket.io-client";
import { useEffect } from "react";
import config from "@/src/helpers/config";
import { State } from "@/src/constants/interfaces";
import Utils from "./Utils";

export default () => {
  const dispatch = useDispatch();
  const { connected } = useSelector((state: State) => state.socket);
  const socket = io(config.server_url, {
    transports: ["websocket"], // You can also specify other transports like 'polling'
    reconnection: true, // Enable reconnection
    reconnectionAttempts: Infinity, // Retry until successful
    reconnectionDelay: 1000, // Initial reconnection delay (1 second)
    reconnectionDelayMax: 5000, // Maximum delay (5 seconds)
    randomizationFactor: 0.5, // Randomization factor for reconnection delay
    timeout: 10000, // Timeout after 10 seconds
  });

  useEffect(() => {
    socket.on("connect", () => {
      dispatch(connectSocket(socket)); // Store the socket instance in Redux
      dispatch(updateConnectedState(true));
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      dispatch(disconnectSocket()); // Remove socket instance from Redux
      dispatch(updateConnectedState(false));
      Utils.showToast("messaging server is disconnected");
    });

    socket.on("error", (error) => {
      console.log("Socket error:", error);
    });
  }, []);

  useEffect(() => {
    if (!connected) {
      console.log("Socket reconnecting");
      socket.connect();
    }
  }, [connected]);
  return null;
};
