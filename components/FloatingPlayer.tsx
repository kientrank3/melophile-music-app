import React, { useEffect, useRef } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  Pressable,
} from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Pause, Play, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Animated } from "react-native";
import { killTrack, pauseTrack, playTrack } from "@/redux/playSlice";

interface FloatingPlayerProps {
  style?: ViewStyle;
}

const FloatingPlayer: React.FC<FloatingPlayerProps> = ({ style }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const { currentTrack, isPlaying, isVisible } = useSelector(
    (state: RootState) => state.player,
    shallowEqual
  );
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);
  const router = useRouter();

  const dispatch = useDispatch();
  if (!isVisible || !currentTrack) return null;
  const handlePress = () => {
    router.push("/player");
  };

  return (
    <Animated.View
      style={[{ opacity }, style]}
      className="absolute bottom-20 left-4 right-4 bg-black py-2 px-3 rounded-lg flex-row items-center"
    >
      <Pressable onPress={handlePress} className="flex-row items-center">
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
          <TouchableOpacity
            onPress={() =>
              dispatch(isPlaying ? pauseTrack() : playTrack(currentTrack))
            }
            className="mx-2"
          >
            {isPlaying ? (
              <Pause fill={"white"} color={"white"} size={22} />
            ) : (
              <Play fill={"white"} color={"white"} size={22} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(killTrack())}>
            <X color={"white"} size={22} />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default React.memo(FloatingPlayer);
