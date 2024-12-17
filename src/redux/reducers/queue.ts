import { createSlice } from "@reduxjs/toolkit";

const initialState: object[] = [];

const playListState = createSlice({
  name: "queueList",
  initialState: initialState,
  reducers: {
    updateList: (state, action) => {
      return [...action.payload];
    },
    addSongQueue: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { updateList, addSongQueue } = playListState.actions;
export default playListState.reducer;
