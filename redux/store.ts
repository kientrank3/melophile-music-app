import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
