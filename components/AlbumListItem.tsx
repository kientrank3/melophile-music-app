import { Text, Image, TouchableOpacity, View } from "react-native";

type AlbumProps = {
  title: string;
  imageUrl: string;
  artistName: string;
  isCollab: boolean;
};
export const AlbumListItem: React.FC<AlbumProps> = ({
  title,
  imageUrl,
  artistName,
  isCollab = false,
}) => {
  return (
    <TouchableOpacity className="p-2 w-32">
      <Image source={{ uri: imageUrl }} className="w-28 h-28 rounded-[10px]" />
      {isCollab ? (
        <Text
          className="text-xs text-gray-400 font-semibold pt-2"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {artistName}
        </Text>
      ) : (
        <View>
          <Text
            className="text-sm font-semibold text-white pt-2 "
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Text
            className="text-xs text-gray-400 font-semibold "
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {artistName}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
