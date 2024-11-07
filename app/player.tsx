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
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, View, Modal } from "react-native";
import Slider from "@react-native-community/slider";
import SongDetail from "@/components/SongDetail";
import { useRouter } from "expo-router";
const formatTime = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
type AudioPlayerProps = {
  track: Song;
};
const PlayerScreen = ({ track }: AudioPlayerProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // const loadAudio = async () => {
  //   if (track.url) {
  //     const { sound, status } = await Audio.Sound.createAsync(
  //       { uri: track.url },
  //       {
  //         shouldPlay: false,
  //       },
  //       onPlaybackStatusUpdate
  //     );
  //     setSound(sound);
  //     if (status.isLoaded) {
  //       setDuration(status.durationMillis || 0);
  //     }
  //   }
  // };

  // const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
  //   if (status.isLoaded) {
  //     setPosition(status.positionMillis || 0);
  //     setDuration(status.durationMillis || 0);
  //   }
  // };

  // useEffect(() => {
  //   loadAudio();

  //   return () => {
  //     if (sound) {
  //       sound.unloadAsync();
  //     }
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current as unknown as number);
  //     }
  //   };
  // }, [track]); // Thêm track vào mảng phụ thuộc để tải lại khi bài nhạc thay đổi

  const handleSliderValueChange = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };
  const handlePlayPause = async () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };
  return (
    <LinearGradient
      style={{ flex: 1 }}
      className="mt-8 items-center"
      colors={["#000", "gray", "black"]}
    >
      <View className="flex-row justify-between px-4 items-center w-full">
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <ChevronDown color={"white"} size={22} />
        </Pressable>
        <Text className="text-white text-md">Hello Kien</Text>
        <Pressable>
          <Ellipsis color="white" size={22} />
        </Pressable>
      </View>
      <View className="w-full h-96 items-center pt-12">
        <Image
          alt="image"
          source={{
            uri: "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
          }}
          className="w-[80%] h-full"
        />
      </View>
      <View className="flex-row justify-between w-full items-center px-5 pt-4">
        <View>
          <Text numberOfLines={1} className="text-white text-2xl font-semibold">
            Sao Hạng A
          </Text>
          <Text className="text-slate-400 pt-1 text-xs">HIEU THU HAI</Text>
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
          onSlidingComplete={handleSliderValueChange}
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
        <Pressable>
          <SkipBack size={32} fill={"white"} color={"white"} />
        </Pressable>
        <Pressable onPress={handlePlayPause}>
          {isPlaying ? (
            <CirclePlay color={"white"} size={60} strokeWidth={1.5} />
          ) : (
            <CirclePause color={"white"} size={60} strokeWidth={1.5} />
          )}
        </Pressable>
        <Pressable>
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
          <Pressable onPress={toggleModal}>
            <Share color={"white"} size={18} />
          </Pressable>
          <Pressable>
            <ListVideo color={"white"} size={20} />
          </Pressable>
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <SongDetail
          route={{ key: "someKey", name: "SongDetail", params: { songId: 1 } }}
        />
      </Modal>
    </LinearGradient>
  );
};
export default PlayerScreen;
