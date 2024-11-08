import React, { useEffect, useRef } from "react";

import Slider from "@react-native-community/slider";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { killTrack } from "@/redux/playSlice";
import { FastForward, Pause, Play, Rewind, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAudioController } from "@/hooks/useAudioController";

interface FloatingPlayerProps {
  style?: ViewStyle;
}

const FloatingPlayer: React.FC<FloatingPlayerProps> = ({ style }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentTrack, isPlaying, isVisible, position, duration } =
    useSelector((state: RootState) => state.player);
  const { togglePlayPause, handlePlayNext, handlePlayPrevious } =
    useAudioController();

  if (!isVisible || !currentTrack) return null;

  const handlePress = () => {
    router.push("/player");
  };

  return (
    <Pressable
      onPress={handlePress}
      className="absolute bottom-20 left-4 right-4 bg-gray-900 p-3 rounded-lg flex-row items-center"
      style={style}
    >
      <Image
        source={{ uri: currentTrack.imageUrl }}
        className="w-10 h-10 rounded mr-4"
        alt="image"
      />
      <View className="flex-1">
        <Text className="text-white text-md font-semibold" numberOfLines={1}>
          {currentTrack.title}
        </Text>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity onPress={handlePlayPrevious}>
          <Rewind color={"white"} size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause} className="mx-2">
          {isPlaying ? (
            <Pause color={"white"} size={20} />
          ) : (
            <Play color={"white"} size={20} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayNext}>
          <FastForward color={"white"} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(killTrack());
          }}
        >
          <X color={"white"} size={20} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default FloatingPlayer;
