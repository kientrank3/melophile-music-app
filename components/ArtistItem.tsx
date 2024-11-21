import { Artist } from "@/utils/database.types";
import { Href, useRouter } from "expo-router";
import { TouchableOpacity, Image, Text } from "react-native";

type ArtistProps = {
  artist: Artist;
};
export const ArtistItem: React.FC<ArtistProps> = ({ artist }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/artist/${artist.id}` as unknown as Href);
  };
  return (
    <TouchableOpacity className="p-2" onPress={handlePress}>
      <Image
        className="w-28 h-28 rounded-full"
        source={{
          uri: artist.imageUrl,
        }}
        alt="image"
      />
      <Text className="text-white text-xs pt-4 font-semibold">
        {artist.name}
      </Text>
    </TouchableOpacity>
  );
};
