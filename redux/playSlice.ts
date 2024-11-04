import { Song } from "@/utils/database.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  currentTrack: Song | null;
  queue: Song[];
  history: Song[]; // Thêm thuộc tính history
  isPlaying: boolean;
  isVisible: boolean;
}

const initialState: PlayerState = {
  currentTrack: null,
  queue: [],
  history: [],
  isPlaying: true,
  isVisible: true,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    initQueue: (state, action: PayloadAction<Song[]>) => {
      state.queue = action.payload;
      state.history = [];
      state.currentTrack = state.queue.length ? state.queue[0] : null;
      state.isPlaying = true;
      state.isVisible = true;
    },
    addToQueue: (state, action: PayloadAction<Song>) => {
      state.queue.push(action.payload);
    },
    playNextTrack: (state) => {
      if (state.currentTrack) {
        state.history.push(state.currentTrack); // Lưu track hiện tại vào history
      }
      state.queue.shift(); // Bỏ bài hát hiện tại khỏi hàng đợi
      state.currentTrack = state.queue.length ? state.queue[0] : null;
      state.isPlaying = !!state.currentTrack;
      state.isVisible = !!state.currentTrack;
    },
    playPreviousTrack: (state) => {
      if (state.history.length > 0) {
        const previousTrack = state.history.pop(); // Lấy bài hát cuối cùng từ history
        if (previousTrack) {
          state.queue.unshift(state.currentTrack!); // Đưa bài hiện tại vào đầu hàng đợi
          state.currentTrack = previousTrack; // Đặt bài hát trước đó là bài hiện tại
          state.isPlaying = true;
        }
      }
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
  },
});

export const {
  initQueue,
  addToQueue,
  playNextTrack,
  playPreviousTrack,
  playTrack,
  pauseTrack,
  killTrack,
} = playerSlice.actions;
export default playerSlice.reducer;
