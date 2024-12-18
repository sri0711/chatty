import { createSlice } from "@reduxjs/toolkit";

const initialState: object[] = [];

const playListState = createSlice({
  name: "playList",
  initialState: initialState,
  reducers: {
    updateList: (state, action) => {
      return [...action.payload];
    },
  },
});

export const { updateList } = playListState.actions;
export default playListState.reducer;
