import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playSlice";
import authReducer from "./authSlice";
import audioMiddleware from "./audioMiddlware";

const store = configureStore({
  reducer: {
    player: playerReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(audioMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
