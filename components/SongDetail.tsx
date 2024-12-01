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
import { RouteProp } from "@react-navigation/native";
import { useAuth } from "@/hooks/authContext";
import {
  addFavorite,
  removeFavorite,
  setFavorites,
} from "@/redux/favoritesSlice";
import { useDispatch } from "react-redux";
import { logRecentlyPlayed } from "@/controllers/recentlyPlayedController";

type RootStackParamList = {
  SongDetail: { songId: number };
};

type SongDetailRouteProp = RouteProp<RootStackParamList, "SongDetail">;

export const SongDetail = ({ route }: { route: SongDetailRouteProp }) => {
  const dispatch = useDispatch();
  const { songId } = route.params;
  const [song, setSong] = useState<Song | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();

  const fetchSong = async () => {
    try {
      const data = await getSongWithId(songId); // Lấy thông tin bài hát
      setSong(data);
      fetchArtist(data.artist_id);
      checkFavoriteStatus(data.id); // Kiểm tra trạng thái yêu thích
      setLoading(false);
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };
  const checkFavoriteStatus = async (songId: number) => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from("FavoriteSong")
          .select("*")
          .eq("song_id", songId)
          .eq("user_id", user.id);

        if (error) throw error;

        setIsFavorite(data.length > 0); // Cập nhật trạng thái yêu thích
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    }
  };
  const toggleFavorite = async () => {
    if (song && user) {
      try {
        if (isFavorite) {
          // Xóa khỏi yêu thích
          const { error } = await supabase
            .from("FavoriteSong")
            .delete()
            .eq("song_id", song.id)
            .eq("user_id", user.id);

          if (error) throw error;
          dispatch(removeFavorite(song.id));
          setIsFavorite(false);
        } else {
          // Thêm vào yêu thích
          const { error } = await supabase
            .from("FavoriteSong")
            .insert([{ song_id: song.id, user_id: user.id }]);

          if (error) throw error;
          dispatch(addFavorite(song));
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error toggling favorite status:", error);
      }
    }
  };
  useEffect(() => {
    if (user && song) {
      // Log the song as recently played
      logRecentlyPlayed(user.id, song.id, "song", song.imageUrl);
    }
  }, [user, song]);
  // useEffect(() => {
  //   const fetchFavoriteSongs = async () => {
  //     if (user) {
  //       const { data: favoriteSongs, error } = await supabase
  //         .from('FavoriteSong')
  //         .select('song_id, Song(*)')
  //         .eq('user_id', user.id);

  //       if (error) {
  //         console.error("Error fetching favorite songs:", error);
  //       } else {
  //         const songs = favoriteSongs.map(item => item.Song).filter(song => song);
  //         dispatch(setFavorites(songs as unknown as Song[]));
  //       }
  //     }
  //   };

  //   fetchFavoriteSongs();
  // }, [user, dispatch]);
  const fetchArtist = async (artistId: number) => {
    try {
      const data = await getArtistWithId(artistId);
      setArtist(data);
    } catch (error) {
      console.error("Error fetching artist:", error);
    }
  };

  const options = [
    {
      icon: Heart,
      label: isFavorite ? "Unlike" : "Like",
      action: toggleFavorite,
      iconColor: isFavorite ? "red" : "white",
    },
    { icon: EyeOff, label: "Hide song", iconColor: "white" },
    { icon: PlusCircle, label: "Add to playlist", iconColor: "white" },
    { icon: ListMusic, label: "Add to queue", iconColor: "white" },
    { icon: Share, label: "Share", iconColor: "white" },
    { icon: Radio, label: "Go to radio", iconColor: "white" },
    { icon: Album, label: "View album", iconColor: "white" },
    { icon: User, label: "View artist", iconColor: "white" },
    { icon: Info, label: "Song credits", iconColor: "white" },
    { icon: Moon, label: "Sleep timer", iconColor: "white" },
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
        <IconComponent size={24} color={item.iconColor} className="mr-4" />
        <Text className="text-white text-lg p-2">{item.label}</Text>
      </TouchableOpacity>
    );
  };

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
