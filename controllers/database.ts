import { Album, Artist, Song } from "@/utils/database.types";
import supabase from "@/utils/supabase";

export const getAllGenre = async () => {
  try {
    const { data, error } = await supabase.from("Genre").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.log("Error fetching genres:", error);
    throw error;
  }
};
export const getAllSong = async () => {
  try {
    const { data, error } = await supabase.from("Song").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.log("Error fetching songs:", error);
    throw error;
  }
};
export const get10Song = async () => {
  const { data, error } = await supabase
    .from("Song")
    .select("*")
    .order("RANDOM()") // Lấy ngẫu nhiên các bản ghi
    .limit(10);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return data || [];
};
export const getSongsWithArtist = async (): Promise<
  (Song & { artist_name: string })[]
> => {
  const { data, error } = await supabase.from("Song").select(`
      *,
      Artist(name)
    `);

  if (error) {
    console.error("Error fetching songs with artist:", error);
    return [];
  }

  const songsWithArtist = data.map((song: any) => ({
    ...song,
    artist_name: song.Artist?.name || "Unknown",
  }));

  return songsWithArtist;
};
export const getAllArtist = async () => {
  try {
    const { data, error } = await supabase.from("Artist").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.log("Error fetching artists:", error);
    throw error;
  }
};
export const getAllAlbum = async () => {
  try {
    const { data, error } = await supabase.from("Album").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.log("Error fetching albums:", error);
    throw error;
  }
};
export async function getSongsByAlbum(albumId: number): Promise<Song[]> {
  const { data, error } = await supabase
    .from("SongAlbum")
    .select(
      `
      song_id: song_id,
      Song (
        id,
        title,
        url,
        imageUrl
      )
    `
    )
    .eq("album_id", albumId);

  if (error) {
    console.error("Error fetching songs by album:", error);
    throw error;
  }

  // Chuyển đổi dữ liệu thành mảng các đối tượng Song
  const songs: Song[] = data.map((row: any) => ({
    id: row.Song.id,
    title: row.Song.title,
    url: row.Song.url,
    imageUrl: row.Song.imageUrl,
    artist_id: row.Song.artist_id,
    album_id: row.Song.album_id,
    genre_id: row.Song.genre_id,
    artist_name: row.Song.artist_name || "Unknown",
  }));

  return songs;
}
export const getSongWithId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("Song")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.log("Error fetching song:", error);
    throw error;
  }
};
export const getArtistWithId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("Artist")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.log("Error fetching artist:", error);
    throw error;
  }
};
export async function getSongsByGenre(genreId: number): Promise<Song[]> {
  const { data, error } = await supabase
    .from("Song")
    .select(
      `
      id AS song_id,
      title AS song_title,
      url AS song_url,
      imageUrl AS song_imageUrl,
      genre_id,
      Genre (
        id,
        title AS genre_title,
        imageUrl AS genre_imageUrl,
        color AS genre_color
      )
    `
    )
    .eq("genre_id", genreId);

  if (error) {
    console.error("Error fetching songs by genre:", error);
    throw error;
  }

  // Chuyển đổi dữ liệu thành mảng các đối tượng Song
  const songs: Song[] = data.map((row: any) => ({
    id: row.song_id,
    title: row.song_title,
    url: row.song_url,
    imageUrl: row.song_imageUrl,
    genre_id: row.genre_id,
    artist_id: row.artist_id,
    album_id: row.album_id,
    artist_name: row.artist_name || "Unknown",
  }));

  return songs;
}
export const getAlbumWithId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("Album")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.log("Error fetching album:", error);
    throw error;
  }
};

export async function getAlbumsByGenre(genreId: number): Promise<Album[]> {
  const { data, error } = await supabase
    .from("Album")
    .select(
      `
      id AS album_id,
      title AS album_title,
      imageUrl AS album_imageUrl,
      genre_id,
      create_date,
      is_compilation,
      Genre (
        id,
        title AS genre_title,
        imageUrl AS genre_imageUrl,
        color AS genre_color
      )
    `
    )
    .eq("genre_id", genreId);

  if (error) {
    console.error("Error fetching albums by genre:", error);
    throw error;
  }

  // Chuyển đổi dữ liệu thành mảng các đối tượng Album
  const albums: Album[] = data.map((row: any) => ({
    id: row.album_id,
    title: row.album_title,
    imageUrl: row.album_imageUrl,
    genre_id: row.genre_id,
    genre_title: row.Genre.title,
    genre_imageUrl: row.Genre.imageUrl,
    genre_color: row.Genre.color,
    created_date: row.create_date
      ? new Date(row.create_date).toISOString()
      : "",
    is_compilation: row.is_compilation,
  }));

  return albums;
}
