import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Image } from "./ui/image";

import { Song } from "@/utils/database.types";
export type TracksListItemProps = {
  track: Song;
  onPress: () => void;
};

export const TrackListItem = ({ track, onPress }: TracksListItemProps) => {
  return (
    <TouchableHighlight onPress={onPress}>
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
        <View>
          {/* {isActiveTrack &&
						(playing ? (
							<LoaderKit
								style={styles.trackPlayingIconIndicator}
								name="LineScaleParty"
								color={colors.icon}
							/>
						) : (
							<Ionicons
								style={styles.trackPausedIndicator}
								name="play"
								size={24}
								color={colors.icon}
							/>
						))} */}
        </View>
      </View>
    </TouchableHighlight>
  );
};
