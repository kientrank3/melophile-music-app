import supabase from "@/utils/supabase";
import { fetchSongsByAlbum, getArtistWithId } from "@/controllers/database";
export const logRecentlyPlayed = async (
  userId: number,
  itemId: number,
  type: string
) => {
  try {
    // Kiểm tra xem bài hát đã tồn tại trong danh sách chưa
    const { data: existingData, error: existingError } = await supabase
      .from("RecentlyPlayed")
      .select("id")
      .eq("user_id", userId)
      .eq("item_id", itemId)
      .eq("type", type)
      .single();

    if (existingError && existingError.code !== "PGRST116") {
      console.error("Error checking existing item:", existingError);
      return;
    }

    let name = "";
    let info = "";
    let imageUrl = "";

    if (type === "song") {
      const { data: songData } = await supabase
        .from("Song")
        .select("title, artist_id, imageUrl")
        .eq("id", itemId)
        .single();
      const { data: artistData } = await supabase
        .from("Artist")
        .select("name")
        .eq("id", songData?.artist_id)
        .single();
      name = songData?.title || "";
      info = artistData?.name || "";
      imageUrl = songData?.imageUrl || "";
    } else if (type === "album") {
      const { data: albumData } = await supabase
        .from("Album")
        .select("title, imageUrl")
        .eq("id", itemId)
        .single();
      const songdata = await fetchSongsByAlbum(itemId);
      const artistData = await getArtistWithId(songdata[0].artist_id);
      name = albumData?.title || "";
      info = artistData?.name || "";
      imageUrl = albumData?.imageUrl || "";
    } else if (type === "artist") {
      const { data: artistData } = await supabase
        .from("Artist")
        .select("name, imageUrl")
        .eq("id", itemId)
        .single();
      name = artistData?.name || "";
      imageUrl = artistData?.imageUrl || "";
    }

    if (existingData) {
      // Nếu đã tồn tại, cập nhật timestamp
      const { error: updateError } = await supabase
        .from("RecentlyPlayed")
        .update({ timestamp: new Date() })
        .eq("id", existingData.id);

      if (updateError) {
        console.error("Error updating timestamp:", updateError);
      }
    } else {
      // Nếu chưa tồn tại, thêm mới
      const { error: insertError } = await supabase
        .from("RecentlyPlayed")
        .insert([
          {
            user_id: userId,
            item_id: itemId,
            name,
            type,
            info,
            timestamp: new Date(),
            imageUrl,
          },
        ]);

      if (insertError) {
        console.error("Error logging recently played item:", insertError);
      }
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

export const fetchRecentItems = async (userId: number) => {
  const { data: recentData, error: recentError } = await supabase
    .from("RecentlyPlayed")
    .select("item_id, name, type, info, timestamp, imageUrl")
    .eq("user_id", userId)
    .order("timestamp", { ascending: false })
    .limit(5);

  if (recentError) {
    console.error("Error fetching recent items:", recentError);
    return [];
  }

  return recentData;
};
