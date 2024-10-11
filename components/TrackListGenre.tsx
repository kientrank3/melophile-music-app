import { Text, Image, TouchableOpacity } from "react-native";

type CardProps = {
  title: string;
  imageUrl: string;
  bgColor: string;
};
export const TrackListGenre: React.FC<CardProps> = ({
  title,
  imageUrl,
  bgColor,
}) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: bgColor }}
      className="h-[90px] rounded-[10px] p-[10px] m-[10px] overflow-hidden"
    >
      <Text className="color-white font-bold text-base">{title}</Text>

      <Image
        className="shadow-lg w-[70px] h-[70px] -mr-5 self-end rounded-[5px] rotate-[24deg]"
        source={{ uri: imageUrl }}
      />
    </TouchableOpacity>
  );
};
