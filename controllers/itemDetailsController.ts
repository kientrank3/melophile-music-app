import supabase from "@/utils/supabase";
export const fetchItemDetails = async (itemId: string, type: string) => {
  let data;
  if (type === "song") {
    const { data: songData } = await supabase
      .from("Songs")
      .select("*")
      .eq("id", itemId);
    data = songData;
  } else if (type === "album") {
    const { data: albumData } = await supabase
      .from("Albums")
      .select("*")
      .eq("id", itemId);
    data = albumData;
  } else if (type === "artist") {
    const { data: artistData } = await supabase
      .from("Artists")
      .select("*")
      .eq("id", itemId);
    data = artistData;
  }
  return data;
};
