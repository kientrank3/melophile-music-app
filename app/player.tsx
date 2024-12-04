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
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Tokens";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SongDetail } from "@/components/SongDetail";
import {
  pauseTrack,
  playNextTrack,
  playPreviousTrack,
  playTrack,
  setPosition,
} from "@/redux/playSlice";
import { useAuth } from "@/hooks/authContext";
import { logRecentlyPlayed } from "@/controllers/recentlyPlayedController";
const formatTime = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const PlayerScreen = React.memo(() => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const handleSharePress = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    router.back();
    //dispatch(pauseTrack());
  };
  const router = useRouter();

  const { currentTrack, isPlaying, position, duration } = useSelector(
    (state: RootState) => state.player,
    shallowEqual
  );
  useEffect(() => {
    if (user && currentTrack) {
      // Log the song as recently played
      logRecentlyPlayed(user.id, currentTrack.id, "song");
    }
  }, [user, currentTrack]);

  if (!currentTrack) return null;

  // const handleSeekComplete = (value: number) => {
  //   dispatch(setPosition(value));
  // };
  return (
    <LinearGradient
      style={{ flex: 1 }}
      className="items-center mt-8"
      colors={[colors.background, "black", "black", "black"]}
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
          source={
            currentTrack.imageUrl
              ? { uri: currentTrack.imageUrl }
              : require("../assets/images/unknown_track.png")
          }
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
          // onSlidingComplete={handleSeekComplete}
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
        <TouchableOpacity>
          <Shuffle size={20} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(playPreviousTrack())}>
          <SkipBack size={32} fill={"white"} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            dispatch(isPlaying ? pauseTrack() : playTrack(currentTrack))
          }
        >
          {isPlaying ? (
            <CirclePause color={"white"} size={60} strokeWidth={1.5} />
          ) : (
            <CirclePlay color={"white"} size={60} strokeWidth={1.5} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(playNextTrack())}>
          <SkipForward size={32} fill={"white"} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <RefreshCcwDot size={20} color={"white"} />
        </TouchableOpacity>
      </View>
      <View className="flex-row w-full px-5 items-center justify-between pt-2">
        <TouchableOpacity>
          <Bluetooth color={"white"} size={18} />
        </TouchableOpacity>
        <View className="flex-row items-center justify-between w-1/4">
          <TouchableOpacity onPress={handleSharePress}>
            <Share color={"white"} size={18} />
          </TouchableOpacity>
          <TouchableOpacity>
            <ListVideo color={"white"} size={20} />
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={modalVisible}
          onSwipeComplete={handleCloseModal}
          swipeDirection="down"
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <SongDetail
              route={{
                key: "someKey",
                name: "SongDetail",
                params: { songId: currentTrack.id },
              }}
            />
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    minHeight: "95%",
  },
});
export default PlayerScreen;
