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

export async function fetchSongsByAlbum(
  albumId: number
): Promise<(Song & { artist_name: string })[]> {
  const { data, error } = await supabase
    .from("SongAlbum")
    .select(
      `
    album_id,
    song_id,
    Song (
      id,
      title,
      url,
      imageUrl,
      artist_id,
      genre_id,
      Artist (
        name
      )
    )
  `
    )
    .eq("album_id", albumId);
  if (error) {
    console.error("Error fetching songs by album:", error);
    throw error;
  }

  return data.map((row: any) => ({
    id: row.Song.id,
    title: row.Song.title,
    url: row.Song.url,
    imageUrl: row.Song.imageUrl,
    artist_id: row.Song.artist_id,
    genre_id: row.Song.genre_id,
    artist_name: row.Song.Artist?.name || "Unknown Artist", // Giá trị mặc định nếu thiếu artist_name
  }));
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
export const getGenreWithId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("Genre")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.log("Error fetching genre:", error);
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
export async function getAlbumsByGenre(genreId: number): Promise<Album[]> {
  const { data, error } = await supabase
    .from("Album")
    .select(
      `
      id ,
      title ,
      imageUrl,
      genre_id,
      create_date,
      is_compilation,
    `
    )
    .eq("genre_id", genreId);

  if (error) {
    console.error("Error fetching albums by genre:", error);
    throw error;
  }

  // Chuyển đổi dữ liệu thành mảng các đối tượng Album
  const albums: Album[] = data.map((row: any) => ({
    id: row.id,
    title: row.title,
    imageUrl: row.imageUrl,
    genre_id: row.genre_id,
    create_date: row.create_date,
    is_compilation: row.is_compilation,
  }));

  return albums;
}
export async function getSongsByGenre(genreId: number): Promise<Song[]> {
  const { data, error } = await supabase
    .from("Song")
    .select(
      `
      id ,
      title ,
      url ,
      imageUrl,
      genre_id,
      artist_id,
       Artist (
        name
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
    id: row.id,
    title: row.title,
    url: row.url,
    imageUrl: row.imageUrl,
    genre_id: row.genre_id,
    artist_id: row.artist_id,
    artist_name: row.Artist?.name || "Unknown Artist",
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

export const fetchRandomSongs = async (limit: number): Promise<Song[]> => {
  const { data, error } = await supabase.rpc("get_random_songs", {
    limit_count: limit,
  });

  if (error) {
    console.error("Error fetching random songs:", error);
    return [];
  }
  return data.map((song: any) => ({
    id: song.id,
    title: song.title,
    url: song.url,
    artist_id: song.artist_id,
    imageUrl: song.imageurl,
    genre_id: song.genre_id,
    artist_name: song.artist_name,
  }));
};
export const fetchRandomAlbums = async (limit: number) => {
  const { data, error } = await supabase.rpc("get_random_albums", {
    limit_count: limit,
  });

  if (error) {
    console.error("Error fetching random albums:", error);
    return [];
  }

  return data;
};
export const fetchRandomGenres = async (limit: number) => {
  const { data, error } = await supabase.rpc("get_random_genres", {
    limit_count: limit,
  });

  if (error) {
    console.error("Error fetching random genres:", error);
    return [];
  }

  return data;
};
export const fetchRandomArtists = async (limit: number) => {
  const { data, error } = await supabase.rpc("get_random_artists", {
    limit_count: limit,
  });

  if (error) {
    console.error("Error fetching random artist:", error);
    return [];
  }

  return data;
};
