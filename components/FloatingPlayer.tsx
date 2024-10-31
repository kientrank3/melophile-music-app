import React, { useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, ViewStyle } from "react-native";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  killTrack,
  setNextTrack,
  pauseTrack,
  playTrack,
} from "@/redux/playSlice";
import { Pause, Play, X } from "lucide-react-native";

interface FloatingPlayerProps {
  style?: ViewStyle;
}

const FloatingPlayer: React.FC<FloatingPlayerProps> = ({ style }) => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, isVisible } = useSelector(
    (state: RootState) => state.player
  );
  const sound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const loadSound = async () => {
      // Dừng và hủy âm thanh cũ nếu tồn tại
      if (sound.current) {
        await sound.current.unloadAsync();
        sound.current = null;
      }

      if (currentTrack?.url) {
        // Tạo âm thanh mới
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: currentTrack.url },
          { shouldPlay: true }
        );
        sound.current = newSound;
      }
    };

    // Tải âm thanh khi currentTrack thay đổi
    if (currentTrack) {
      loadSound();
    }

    // Hủy âm thanh khi component bị hủy hoặc currentTrack thay đổi
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
        sound.current = null;
      }
    };
  }, [currentTrack]);

  const togglePlayPause = async () => {
    if (sound.current) {
      if (isPlaying) {
        await sound.current.pauseAsync();
        dispatch(pauseTrack());
      } else {
        await sound.current.playAsync();
        dispatch(playTrack());
      }
    }
  };
  const stop = async () => {
    if (sound.current) {
      await sound.current.stopAsync();
    }
    dispatch(killTrack());
  };
  if (!isVisible || !currentTrack) return null;

  return (
    <View
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
        <TouchableOpacity onPress={togglePlayPause} className="mr-4">
          {isPlaying ? (
            <Pause color={"white"} size={22} />
          ) : (
            <Play color={"white"} size={20} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={stop}>
          <X color={"white"} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FloatingPlayer;
