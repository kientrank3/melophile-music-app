export interface Genre {
  id: number;
  title: string;
  imageUrl: string;
  color: string;
}
export interface Song {
  id: number;
  title: string;
  url: string;
  artist_id: number;
  imageUrl: string;
  genre_id: number;
  artist_name: string;
}
export interface SongAlbum {
  song_id: number;
  album_id: number;
}
export interface Artist {
  id: number;
  name: string;
  imageUrl: string;
}
export interface Album {
  id: number;
  title: string;
  imageUrl: string;
  genre_id: number;
  is_compilation: boolean;
  create_date: string;
}
export interface User {
  id: number;
  user_name: string;
  phone_number: string;
  email: string;
  name: string;
  password: string;
  urlImage: string;
}
export interface FavoriteSong {
  id: number;
  user_id: number;
  song_id: number;
}

export interface AlbumCollab {
  artist_id: number;
  album_id: number;
}
export interface UserSong {
  user_id: number;
  song_id: number;
}
