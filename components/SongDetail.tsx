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
import { Song, Artist } from "@/utils/database.types";
import { getSongWithId, getArtistWithId } from "../controllers/database";
import supabase from "@/utils/supabase";
import { useUser } from "@/hooks/useUser";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  SongDetail: { songId: number };
};

type SongDetailRouteProp = RouteProp<RootStackParamList, "SongDetail">;

export const SongDetail = ({ route }: { route: SongDetailRouteProp }) => {
  const { songId } = route.params;
  const [song, setSong] = useState<Song | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  const fetchSong = async () => {
    try {
      const data = await getSongWithId(songId); // Gọi hàm getSongWithId để lấy dữ liệu bài hát
      setSong(data);
      fetchArtist(data.artist_id);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };
  const fetchArtist = async (artistId: number) => {
    try {
      const data = await getArtistWithId(artistId);
      setArtist(data);
    } catch (error) {
      console.error("Error fetching artist:", error);
    }
  };

  const handleAddToFavorites = async () => {
    if (song && user) {
      try {
        const { data, error } = await supabase
          .from("FavoriteSong")
          .insert([{ song_id: song.id, user_id: user.id }]); // Thay 'your-user-id' bằng ID người dùng thực tế

        if (error) {
          throw error;
        }

        console.log("Song added to favorites:", data);
      } catch (error) {
        console.error("Error adding song to favorites:", error);
      }
    }
  };
  const options = [
    { icon: Heart, label: "Like", action: handleAddToFavorites },
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

  useEffect(() => {
    fetchSong();
  }, [songId]);
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
      <TouchableOpacity
        className="flex-row items-center py-3 border-b"
        onPress={item.action}
      >
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
        <Text className="text-gray-400">{artist?.name}</Text>
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
