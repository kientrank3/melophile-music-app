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
export const getSongsWithArtistDetails = async (): Promise<
  (Song & Pick<Artist, "name">)[]
> => {
  const { data, error } = await supabase.from("song").select(`
      id,
      title,
      url,
      artist_id,
      imageUrl,
      genre_id,
      artist:artist_id (name)
    `);

  if (error) {
    console.error("Error fetching songs with artist details:", error);
    return [];
  }

  return data.map((song: any) => ({
    id: song.id,
    title: song.title,
    url: song.url,
    artist_id: song.artist_id,
    imageUrl: song.imageUrl,
    genre_id: song.genre_id,
    name: song.artist.name,
  }));
};
