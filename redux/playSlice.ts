import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "@/utils/database.types";
interface PlayerState {
  currentTrack: Song | null;
  queue: Song[];
  history: Song[];
  isPlaying: boolean;
  isVisible: boolean;
  position: number;
  duration: number;
  trackListId: string;
}

const initialState: PlayerState = {
  currentTrack: null,
  queue: [],
  history: [],
  isPlaying: false,
  isVisible: false,
  position: 0,
  duration: 0,
  trackListId: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<number>) => {
      state.position = action.payload;
    },
    setCurrentTrackList: (state, action: PayloadAction<string>) => {
      state.trackListId = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    initQueue: (
      state,
      action: PayloadAction<{
        queue: Song[];
        history: Song[];
        trackListId: string;
      }>
    ) => {
      const { queue, history, trackListId } = action.payload;
      state.queue = queue;
      state.history = history;
      state.trackListId = trackListId;
      state.currentTrack = queue.length > 0 ? queue[0] : null; // Đảm bảo currentTrack là bài đầu tiên trong hàng đợi
      state.isPlaying = !!state.currentTrack;
    },
    playTrack: (state, action: PayloadAction<Song>) => {
      // Khi phát bài mới, cập nhật currentTrack mà không thay đổi history
      state.currentTrack = action.payload;
      state.isPlaying = true;
      state.isVisible = true;
    },
    playNextTrack: (state) => {
      if (state.currentTrack) {
        // Đưa bài hiện tại vào cuối history
        state.history.push(state.currentTrack);
      }

      if (state.queue.length > 0) {
        // Lấy bài tiếp theo từ queue
        state.currentTrack = state.queue.shift() || null;
      } else {
        // Nếu không còn bài trong queue, dừng phát
        state.currentTrack = null;
      }

      state.isPlaying = !!state.currentTrack;
    },

    playPreviousTrack: (state) => {
      if (state.history.length > 0) {
        // Đưa bài hiện tại vào đầu queue
        if (state.currentTrack) {
          state.queue.unshift(state.currentTrack);
        }

        // Lấy bài trước đó từ history
        state.currentTrack = state.history.pop() || null;
      }

      state.isPlaying = !!state.currentTrack;
    },

    pauseTrack: (state) => {
      state.isPlaying = false;
    },
    killTrack: (state) => {
      state.currentTrack = null;
      state.isPlaying = false;
      state.isVisible = false;
      state.position = 0;
      state.duration = 0;
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
  setCurrentTrackList,
} = playerSlice.actions;
export default playerSlice.reducer;
