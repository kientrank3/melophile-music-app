import { TouchableOpacity, Image, Text } from "react-native";

type ArtistProps = {
  name: string;
  imageUrl: string;
};
export const ArtistItem: React.FC<ArtistProps> = ({ name, imageUrl }) => {
  return (
    <TouchableOpacity className="p-2">
      <Image
        className="w-28 h-28 rounded-full"
        source={{
          uri: imageUrl,
        }}
        alt="image"
      />
      <Text className="text-white text-xs pt-4 font-semibold">{name}</Text>
    </TouchableOpacity>
  );
};
