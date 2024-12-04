import { Genre } from "@/utils/database.types";
import { Href, router } from "expo-router";
import { Text, Image, TouchableOpacity } from "react-native";

type CardProps = {
  genre: Genre;
};
export const TrackListGenre: React.FC<CardProps> = ({ genre }) => {
  const handlePress = () => {
    router.push(`/genres/${genre.id}` as unknown as Href);
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ backgroundColor: genre.color }}
      className="h-[90px] rounded-[10px] p-[10px] m-[10px] overflow-hidden "
    >
      <Text className="color-white font-bold text-base">{genre.title}</Text>

      <Image
        className="shadow-lg w-[70px] h-[70px] -mr-5 self-end rounded-[5px] absolute bottom-[-16px] right-1"
        style={{ transform: [{ rotate: "24deg" }] }}
        source={{ uri: genre.imageUrl }}
      />
    </TouchableOpacity>
  );
};
