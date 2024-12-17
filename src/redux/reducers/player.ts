import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  buffered: false,
  current_song_details: {
    image:
      "https://cdn.dribbble.com/users/3547568/screenshots/14395014/music_jpeg_4x.jpg",
    track_name: "<Not Playing>",
    track_id: "",
  },
  pause_button_tapped: false,
  isPlaying: false,
  timer: {
    total_time: undefined,
    current_time: undefined,
  },
};

const musicState = createSlice({
  name: "music",
  initialState: initialState,
  reducers: {
    updateBufferedState: (state, action) => {
      state.buffered = action.payload;
    },
    updatePauseButtonState: (state, action) => {
      state.pause_button_tapped = action.payload;
    },
    updateSongDetails: (state, action) => {
      state.current_song_details = {
        image: action.payload.image,
        track_name: action.payload.track_name,
        track_id: action.payload.track_id,
      };
    },
    updateIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    updateTotalTime: (state, action) => {
      state.timer.total_time = action.payload;
    },
    updateCurrentTime: (state, action) => {
      state.timer.current_time = action.payload;
    },
  },
});

export const {
  updateBufferedState,
  updateSongDetails,
  updatePauseButtonState,
  updateIsPlaying,
  updateTotalTime,
  updateCurrentTime,
} = musicState.actions;
export default musicState.reducer;
