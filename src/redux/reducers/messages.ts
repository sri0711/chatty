import { createSlice } from "@reduxjs/toolkit";

const initialState: [object] = [
  {
    name: "admin",
    message:
      "Welcome to Chatty. We don't store your any data so offline message is not possible.",
  },
];

const messages = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    addMessages: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addMessages } = messages.actions;

export default messages.reducer;
