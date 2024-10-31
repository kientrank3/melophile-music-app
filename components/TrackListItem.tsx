import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "./ui/image";

import { Song } from "@/utils/database.types";
import { useDispatch } from "react-redux";
import { initTrack } from "@/redux/playSlice";
export type TracksListItemProps = {
  track: Song;
};

export const TrackListItem = ({ track }: TracksListItemProps) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity onPress={() => dispatch(initTrack(track))}>
      <View className="flex-row items-center px-5 py-2">
        <View>
          <Image
            size="xs"
            source={{
              uri: track.imageUrl,
            }}
            alt="image"
          />
        </View>
        <View className="flex-1 px-2 ">
          <Text className="text-white text-base px-1">{track.title}</Text>
          <Text className="text-gray-300 text-sm px-1">{track.artist_id}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
