import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buffered: false,
  current_song_details: {
    image:
      "https://cdn.dribbble.com/users/3547568/screenshots/14395014/music_jpeg_4x.jpg",
    track_name: "<Not Playing>",
  },
  pause_button_tapped: false,
  isPlaying: false,
};

const musicState = createSlice({
  name: "music",
  initialState: initialState,
  reducers: {
    updateBufferedState: (state) => {
      state.buffered = !state.buffered;
    },
    updatePauseButtonState: (state) => {
      state.pause_button_tapped = !state.pause_button_tapped;
    },
    updateSongDetails: (state, action) => {
      state.current_song_details = {
        image: action.payload.image,
        track_name: action.payload.track_name,
      };
    },
    updateIsPlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const {
  updateBufferedState,
  updateSongDetails,
  updatePauseButtonState,
  updateIsPlaying,
} = musicState.actions;
export default musicState.reducer;
