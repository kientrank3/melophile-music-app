import { Album } from "@/utils/database.types";
import { Href, useRouter } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";

type AlbumProps = {
  album: Album;
};
export const AlbumListItem: React.FC<AlbumProps> = ({ album }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/playlist/${album.id}` as unknown as Href);
  };
  return (
    <TouchableOpacity onPress={handlePress} className="p-2 w-32">
      <Image
        source={{ uri: album.imageUrl }}
        className="w-28 h-28 rounded-[10px]"
      />
      {album.is_compilation ? (
        <Text
          className="text-xs text-white font-semibold pt-2"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {album.title}
        </Text>
      ) : (
        <View>
          <Text
            className="text-sm font-semibold text-white pt-2 "
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {album.title}
          </Text>
          <Text
            className="text-xs text-gray-400 font-semibold "
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {album.created_date}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
