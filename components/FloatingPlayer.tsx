import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  Pressable,
} from "react-native";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  killTrack,
  pauseTrack,
  playTrack,
  playNextTrack,
  playPreviousTrack,
} from "@/redux/playSlice";
import { FastForward, Pause, Play, Rewind, X } from "lucide-react-native";
import { useRouter } from "expo-router";

interface FloatingPlayerProps {
  style?: ViewStyle;
}

const FloatingPlayer: React.FC<FloatingPlayerProps> = ({ style }) => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, isVisible } = useSelector(
    (state: RootState) => state.player
  );
  const sound = useRef<Audio.Sound | null>(null);
  const router = useRouter();
  useEffect(() => {
    const loadSound = async () => {
      if (sound.current) {
        await sound.current.unloadAsync();
        sound.current = null;
      }

      if (currentTrack?.url) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: currentTrack.url },
          { shouldPlay: isPlaying }
        );
        sound.current = newSound;

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            dispatch(playNextTrack()); // Phát bài hát tiếp theo khi bài hiện tại kết thúc
          }
        });
      }
    };

    if (currentTrack) {
      loadSound();
    }

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
      dispatch(killTrack());
    }
  };
  const playNext = async () => {
    if (sound.current) {
      await sound.current.stopAsync();
      dispatch(playNextTrack());
    }
  };
  const playPrevious = async () => {
    if (sound.current) {
      await sound.current.stopAsync();
      dispatch(playPreviousTrack());
    }
  };

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
        <TouchableOpacity onPress={playPrevious}>
          <Rewind color={"white"} size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause} className="mx-2">
          {isPlaying ? (
            <Pause color={"white"} size={20} />
          ) : (
            <Play color={"white"} size={20} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={playNext}>
          <FastForward color={"white"} size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={stop}>
          <X color={"white"} size={20} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default FloatingPlayer;
