import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const initialState = {
  user_name: SecureStore.getItem("name") || undefined,
  room_id: SecureStore.getItem("room_id") || undefined,
  show_player: false,
  song_search: "",
};

const chattyAppState = createSlice({
  name: "chatty_app",
  initialState: initialState,
  reducers: {
    update_user_name: (state, action) => {
      state.user_name = action.payload;
    },
    updateShowPlayer: (state) => {
      state.show_player = !state.show_player;
    },
  },
});

export const { update_user_name, updateShowPlayer } = chattyAppState.actions;
export default chattyAppState.reducer;
