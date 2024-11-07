import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  Heart,
  EyeOff,
  PlusCircle,
  ListMusic,
  Share,
  Radio,
  Album,
  User,
  Info,
  Moon,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
//import ImageColors from "react-native-image-colors"
//import useImageColors from '../hooks/useImageColor';
import { getSongWithId } from "../controllers/database";
import axios from "axios";

// const song = {
//   id: 1,
//   title: "Cơn Mưa Tháng 5",
//   url: "https://seurmazgxtotnrbiypmg.supabase.co/storage/v1/object/public/song/ConMuaThang5-TungDuongTranLap-6926895.mp3?t=2024-10-15T00%3A37%3A18.407Z",
//   artist: "Hà Nhi",
//   imageUrl:
//     "https://seurmazgxtotnrbiypmg.supabase.co/storage/v1/object/public/songImage/chuaquennguoiyeucu.jpg?t=2024-10-15T00%3A42%3A41.966Z",
// };
const options = [
  { icon: Heart, label: "Like" },
  { icon: EyeOff, label: "Hide song" },
  { icon: PlusCircle, label: "Add to playlist" },
  { icon: ListMusic, label: "Add to queue" },
  { icon: Share, label: "Share" },
  { icon: Radio, label: "Go to radio" },
  { icon: Album, label: "View album" },
  { icon: User, label: "View artist" },
  { icon: Info, label: "Song credits" },
  { icon: Moon, label: "Sleep timer" },
];

import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  SongDetail: { songId: number };
};

type SongDetailRouteProp = RouteProp<RootStackParamList, "SongDetail">;

const SongDetail = ({ route }: { route: SongDetailRouteProp }) => {
  const { songId } = route.params;
  interface Song {
    id: number;
    title: string;
    url: string;
    artist: string;
    imageUrl: string;
  }

  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSong = async () => {
    try {
      const data = await getSongWithId(songId); // Gọi hàm getSongWithId để lấy dữ liệu bài hát
      setSong(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  useEffect(() => {
    fetchSong();
  }, []);
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (!song) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">Song not found</Text>
      </View>
    );
  }
  const renderOption = ({ item }: any) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity className="flex-row items-center py-3 border-b">
        <IconComponent size={24} color="white" className="mr-4" />
        <Text className="text-white text-lg p-2">{item.label}</Text>
      </TouchableOpacity>
    );
  };
  //const { colors, error } = useImageColors(song.imageUrl);

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#fff", "black"]} // Dùng màu chủ đạo từ hình ảnh
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute inset-0"
      />
      <View className="items-center py-10">
        <Image
          source={{ uri: song.imageUrl }}
          style={{ width: 200, height: 200 }}
        />
        <Text className="text-white text-2xl">{song.title}</Text>
        <Text className="text-gray-400">{song.artist}</Text>
      </View>
      <FlatList
        data={options}
        renderItem={renderOption}
        keyExtractor={(item) => item.label}
        contentContainerStyle={{ width: "100%", paddingHorizontal: 20 }}
      />
    </View>
  );
};
export default SongDetail;
