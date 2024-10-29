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
  created_date: string;
}
