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
