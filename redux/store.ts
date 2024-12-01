import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playSlice";
import authReducer from "./authSlice";
import audioMiddleware from "./audioMiddlware";
import favoritesReducer from "./favoritesSlice";
const store = configureStore({
  reducer: {
    player: playerReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(audioMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
