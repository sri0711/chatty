import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  connected: false,
  joined: false,
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
    updateConnectedState: (state, action) => {
      state.connected = action.payload;
    },
    updateJoinRoomState: (state, action) => {
      state.joined = action.payload;
    },
  },
});

export const {
  connectSocket,
  disconnectSocket,
  updateConnectedState,
  updateJoinRoomState,
} = SocketState.actions;
export default SocketState.reducer;
