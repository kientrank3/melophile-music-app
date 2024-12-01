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
