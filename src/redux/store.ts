import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./reducers/messages";
import chattyAppState from "./reducers/appState";
import playerState from "./reducers/player";
import playListState from "./reducers/playlist";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";

export const store = configureStore({
  devTools: true,
  reducer: {
    messages: messagesReducer,
    chatty_app_state: chattyAppState,
    player: playerState,
    play_list: playListState,
  },
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(devToolsEnhancer()),
});
