import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "@/utils/database.types";

interface PlayerState {
  currentTrack: Song | null;
  queue: Song[];
  history: Song[];
  isPlaying: boolean;
  isVisible: boolean;
  position: number; // Thêm vị trí phát nhạc
  duration: number; // Thêm thời lượng bài nhạc
}

const initialState: PlayerState = {
  currentTrack: null,
  queue: [],
  history: [],
  isPlaying: false,
  isVisible: false,
  position: 0,
  duration: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<number>) => {
      state.position = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    initQueue: (
      state,
      action: PayloadAction<{ queue: Song[]; history: Song[] }>
    ) => {
      const { queue, history } = action.payload;
      state.queue = queue;
      state.history = history;
      state.currentTrack = null;
      state.isPlaying = false;
      state.isVisible = false;
    },
    playTrack: (state, action: PayloadAction<Song>) => {
      // Khi phát bài mới, cập nhật currentTrack mà không thay đổi history
      state.currentTrack = action.payload;
      state.isPlaying = true;
      state.isVisible = true; // Hiện FloatingPlayer
    },
    playNextTrack: (state) => {
      if (state.currentTrack) {
        state.history.push(state.currentTrack); // Di chuyển currentTrack vào history
      }
      state.queue.shift(); // Loại bỏ bài hiện tại khỏi queue
      state.currentTrack = state.queue.length ? state.queue[0] : null; // Cập nhật bài tiếp theo

      state.isPlaying = !!state.currentTrack; // Phát nhạc nếu còn bài trong queue
      state.isVisible = !!state.currentTrack;
    },
    playPreviousTrack: (state) => {
      if (state.history.length > 0) {
        const previousTrack = state.history.pop(); // Lấy bài trước từ history
        if (previousTrack) {
          state.queue.unshift(state.currentTrack!); // Thêm bài hiện tại vào đầu queue
          state.currentTrack = previousTrack; // Cập nhật bài trước đó là currentTrack
          state.isPlaying = true;
        }
      }
    },
    pauseTrack: (state) => {
      state.isPlaying = false;
    },
    killTrack: (state) => {
      state.currentTrack = null;
      state.isPlaying = false;
      state.isVisible = false;
      state.history = [];
      state.queue = [];
    },
  },
});

export const {
  setPosition,
  setDuration,
  initQueue,
  playTrack,
  playNextTrack,
  playPreviousTrack,
  pauseTrack,
  killTrack,
} = playerSlice.actions;
export default playerSlice.reducer;
