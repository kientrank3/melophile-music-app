import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "./ui/image";
import { Song } from "@/utils/database.types";
import { EllipsisVertical } from "lucide-react-native";
export type TracksListItemProps = {
  track: Song;
  onPress: () => void;
};

export const TrackListItem = ({ track, onPress }: TracksListItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row items-center px-2.5 py-2">
        <View>
          <Image
            className="w-[46px] h-[46px] rounded-[5px]"
            source={
              track.imageUrl
                ? { uri: track.imageUrl }
                : require("../assets/images/unknown_track.png")
            }
            alt="image"
          />
        </View>
        <View className="flex-1 px-2 ">
          <Text className="text-white text-base px-1">{track.title}</Text>
          <Text className="text-gray-300 text-sm px-1">
            {track.artist_name}
          </Text>
        </View>
        <View className="">
          <EllipsisVertical color={"white"} size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
