import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

const SocketState = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {
    connectSocket: (state, action) => {
      state.socket = action.payload;
    },
    disconnectSocket: (state) => {
      state.socket = null;
    },
  },
});

export const { connectSocket, disconnectSocket } = SocketState.actions;
export default SocketState.reducer;
