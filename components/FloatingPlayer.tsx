import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  Pressable,
} from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Pause, Play, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAudioController } from "@/hooks/useAudioController";

interface FloatingPlayerProps {
  style?: ViewStyle;
}

const FloatingPlayer: React.FC<FloatingPlayerProps> = ({ style }) => {
  const router = useRouter();
  const { currentTrack, isPlaying, isVisible } = useSelector(
    (state: RootState) => state.player,
    shallowEqual
  );
  const { togglePlayPause, handleKillTrack } = useAudioController();

  if (!isVisible || !currentTrack) return null;
  const handlePress = () => {
    router.push("/player");
  };

  return (
    <Pressable
      onPress={handlePress}
      className="absolute bottom-20 left-4 right-4 bg-black py-2 px-3 rounded-lg flex-row items-center"
      style={style}
    >
      <Image
        source={{ uri: currentTrack.imageUrl }}
        className="w-12 h-12 rounded mr-4"
        alt="image"
      />
      <View className="flex-1">
        <Text className="text-white text-md font-semibold" numberOfLines={1}>
          {currentTrack.title}
        </Text>
        <Text className="text-gray-400 text-xs " numberOfLines={1}>
          {currentTrack.artist_name}
        </Text>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity onPress={togglePlayPause} className="mx-2">
          {isPlaying ? (
            <Pause fill={"white"} color={"white"} size={22} />
          ) : (
            <Play fill={"white"} color={"white"} size={22} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleKillTrack}>
          <X color={"white"} size={22} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default FloatingPlayer;
