import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "@/utils/database.types";

interface FavoritesState {
  songs: Song[];
}

const initialState: FavoritesState = {
  songs: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },
    addFavorite: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
