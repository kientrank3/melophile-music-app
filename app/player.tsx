import { Song } from "@/utils/database.types";
import { Audio, AVPlaybackStatus } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import {
  Bluetooth,
  ChevronDown,
  CirclePause,
  CirclePlay,
  Ellipsis,
  Heart,
  ListVideo,
  RefreshCcwDot,
  Share,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react-native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Tokens";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAudioController } from "@/hooks/useAudioController";
const formatTime = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const PlayerScreen = () => {
  const router = useRouter();
  const { togglePlayPause, handlePlayNext, handlePlayPrevious, handleSeek } =
    useAudioController();
  const { currentTrack, isPlaying, position, duration } = useSelector(
    (state: RootState) => state.player
  );

  if (!currentTrack) return null;

  return (
    <LinearGradient
      style={{ flex: 1 }}
      className="mt-8 items-center "
      colors={[colors.background, "white", "black", "black"]}
    >
      <View className="flex-row justify-between px-4 items-center w-full mt-8">
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <ChevronDown color={"white"} size={22} />
        </Pressable>
        <Text className="text-white text-md">Player Screen</Text>
        <Pressable>
          <Ellipsis color="white" size={22} />
        </Pressable>
      </View>
      <View className="w-full h-96 items-center pt-12">
        <Image
          source={{
            uri: currentTrack?.imageUrl,
          }}
          resizeMode="contain"
          className="w-[80%] h-full"
        />
      </View>
      <View className="flex-row justify-between w-full items-center px-5 pt-4">
        <View>
          <Text numberOfLines={1} className="text-white text-2xl font-semibold">
            {currentTrack?.title}
          </Text>
          <Text className="text-slate-400 pt-1 text-md">
            {currentTrack?.artist_name}
          </Text>
        </View>
        <Pressable className="pt-5">
          <Heart color={"white"} size={22} strokeWidth={1.5} />
        </Pressable>
      </View>
      <View className="w-full justify-center mt-4 px-5">
        <Slider
          className="h-4 items-center"
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={handleSeek}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#CCCCCC"
          thumbTintColor="#FFFFFF"
        />
        <View className="flex-row justify-between mt-2">
          <Text className="text-white">{formatTime(position)}</Text>
          <Text className="text-white">-{formatTime(duration - position)}</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between w-full px-5 pt-2">
        <Pressable>
          <Shuffle size={20} color={"white"} />
        </Pressable>
        <Pressable onPress={handlePlayPrevious}>
          <SkipBack size={32} fill={"white"} color={"white"} />
        </Pressable>
        <Pressable onPress={togglePlayPause}>
          {isPlaying ? (
            <CirclePause color={"white"} size={60} strokeWidth={1.5} />
          ) : (
            <CirclePlay color={"white"} size={60} strokeWidth={1.5} />
          )}
        </Pressable>
        <Pressable onPress={handlePlayNext}>
          <SkipForward size={32} fill={"white"} color={"white"} />
        </Pressable>
        <Pressable>
          <RefreshCcwDot size={20} color={"white"} />
        </Pressable>
      </View>
      <View className="flex-row w-full px-5 items-center justify-between pt-2">
        <Pressable>
          <Bluetooth color={"white"} size={18} />
        </Pressable>
        <View className="flex-row items-center justify-between w-1/4">
          <Pressable>
            <Share color={"white"} size={18} />
          </Pressable>
          <Pressable>
            <ListVideo color={"white"} size={20} />
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};
export default PlayerScreen;
