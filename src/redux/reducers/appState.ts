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
    updateUserName: (state, action) => {
      state.user_name = action.payload;
    },
    updateShowPlayer: (state, action) => {
      state.show_player = action.payload;
    },
    updateRoomId: (state, action) => {
      state.room_id = action.payload;
    },
    updateSongSearch: (state, action) => {
      state.song_search = action.payload;
    },
  },
});

export const {
  updateUserName,
  updateShowPlayer,
  updateRoomId,
  updateSongSearch,
} = chattyAppState.actions;
export default chattyAppState.reducer;
