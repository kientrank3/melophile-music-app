import { Song } from "@/utils/database.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  currentTrack: Song | null;
  isPlaying: boolean;
  isVisible: boolean;
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: true,
  isVisible: true,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    initTrack: (state, action: PayloadAction<Song>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
      state.isVisible = true;
    },
    playTrack: (state) => {
      state.isPlaying = true;
    },
    pauseTrack: (state) => {
      state.isPlaying = false;
    },
    killTrack: (state) => {
      state.isPlaying = false;
      state.isVisible = false;
    },
    setNextTrack: (state, action: PayloadAction<Song>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
  },
});

export const { playTrack, killTrack, initTrack, setNextTrack, pauseTrack } =
  playerSlice.actions;
export default playerSlice.reducer;
