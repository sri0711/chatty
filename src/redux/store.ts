import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./reducers/messages";
import chattyAppState from "./reducers/appState";
import playerState from "./reducers/player";
import playListState from "./reducers/playlist";
import socketState from "./reducers/socket";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";

export const store = configureStore({
  devTools: false,
  reducer: {
    messages: messagesReducer,
    chatty_app_state: chattyAppState,
    player: playerState,
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
