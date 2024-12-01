import supabase from "@/utils/supabase";
export const logRecentlyPlayed = async (
  userId: number,
  itemId: number,
  type: string,
  imageUrl: string
) => {
  const { data: songData } = await supabase
    .from("Songs")
    .select("name")
    .eq("id", itemId);
  const { error } = await supabase
    .from("RecentlyPlayed")
    .insert([
      {
        user_id: userId,
        item_id: itemId,
        name: songData?.[0].name,
        type,
        timestamp: new Date(),
        imageUrl: imageUrl,
      },
    ]);

  if (error) {
    console.error("Error logging recently played item:", error);
  }
};

export const fetchRecentItems = async (userId: number) => {
  const { data, error } = await supabase
    .from("RecentlyPlayed")
    .select("item_id, name, type, timestamp, imageUrl")
    .eq("user_id", userId)
    .order("timestamp", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching recent items:", error);
    return [];
  }

  return data;
};
