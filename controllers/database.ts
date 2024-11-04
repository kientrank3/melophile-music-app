import { Artist, Song } from "@/utils/database.types";
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
