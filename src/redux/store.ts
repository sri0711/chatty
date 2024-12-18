import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "@/src/redux/reducers/messages";
import chattyAppState from "@/src/redux/reducers/appState";
import playerState from "@/src/redux/reducers/player";
import playListState from "@/src/redux/reducers/playlist";
import socketState from "@/src/redux/reducers/socket";
import queueState from "@/src/redux/reducers/queue";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";

export const store = configureStore({
  devTools: true,
  reducer: {
    messages: messagesReducer,
    chatty_app_state: chattyAppState,
    player: playerState,
    queue_list: queueState,
    play_list: playListState,
    socket: socketState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["socket/connectSocket", "socket/disconnectSocket"],
        ignoredPaths: ["socket"], // Ignore the 'socket' path where the instance is stored
      },
    }),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(devToolsEnhancer()),
});
