import React, { useEffect, useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ListRenderItem,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/authContext";
import supabase from "@/utils/supabase";
import { Song } from "@/utils/database.types";
import { useRouter } from "expo-router";
type LibraryParamList = {
  index: undefined;
  "userLibrary/index": undefined;
  "userSettings/index": undefined;
};
type LibraryItem = {
  id: string;
  type: "playlist" | "artist" | "song";
  name: string;
  info?: string;
  icon?: string;
  imageUri?: string;
  onPress?: () => void;
};

const LibraryScreen = () => {
  const navigation = useNavigation<NavigationProp<LibraryParamList>>();
  const { user } = useAuth();
  const [likedSongsCount, setLikedSongsCount] = useState<number>(0);
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const router = useRouter();

  const renderItem: ListRenderItem<LibraryItem> = ({ item }) => (
    <TouchableOpacity
      className="flex-row items-center p-4"
      onPress={item.onPress}
    >
      {item.icon ? (
        <Ionicons
          name={item.icon as any}
          size={24}
          color="white"
          className="mr-4"
        />
      ) : (
        <Image
          source={{ uri: item.imageUri }}
          className="w-10 h-10 rounded-full mr-4"
        />
      )}
      <View>
        <Text className="text-white text-base font-semibold">{item.name}</Text>
        {item.info && (
          <Text className="text-gray-400 text-sm">{item.info}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    const fetchLikedSongsCount = async () => {
      if (user) {
        const { data: favoriteSongs, error } = await supabase
          .from("FavoriteSong")
          .select("song_id")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching liked songs:", error);
          return;
        }

        const songIds = favoriteSongs.map((item) => item.song_id);

        const { data: songs, error: songError } = await supabase
          .from("Song") // Replace with your actual songs table name
          .select("*")
          .in("id", songIds);

        if (songError) {
          console.error("Error fetching songs:", songError);
        } else {
          setLikedSongs(songs);
          setLikedSongsCount(songs.length);
        }
      }
    };

    fetchLikedSongsCount();
  }, [user]);
  const handleLikedSongsPress = () => {
    router.push({
      pathname: "/playlist/[albumId]",
      params: {
        albumId: JSON.stringify(user?.id),
        songs: JSON.stringify(likedSongs), // Convert to JSON string
      },
    });
  };
  const data: LibraryItem[] = [
    {
      id: "1",
      type: "playlist",
      name: "Liked Songs",
      info: `${likedSongsCount} songs`,
      icon: "heart",
      onPress: handleLikedSongsPress,
    },
    {
      id: "2",
      type: "artist",
      name: "Lolo Zouaï",
      imageUri:
        "https://img.freepik.com/premium-vector/cute-cat-cartoon-vector-illustration_921448-1392.jpg",
    },
    {
      id: "3",
      type: "artist",
      name: "Lana Del Rey",
      imageUri:
        "https://img.freepik.com/premium-vector/cute-cat-cartoon-vector-illustration_921448-1392.jpg",
    },
    {
      id: "4",
      type: "playlist",
      name: "Front Left",
      info: "Playlist • Spotify",
      imageUri:
        "https://img.freepik.com/premium-vector/cute-cat-cartoon-vector-illustration_921448-1392.jpg",
    },
    {
      id: "5",
      type: "artist",
      name: "Marvin Gaye",
      imageUri:
        "https://img.freepik.com/premium-vector/cute-cat-cartoon-vector-illustration_921448-1392.jpg",
    },
  ];
  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("userLibrary/index")}
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 40 }}
              source={{
                uri: user?.urlImage,
              }}
              alt="Profile image"
            />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold px-4">Library</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Filter Section */}
      <View className="flex-row justify-between px-4 mb-4">
        <TouchableOpacity className="px-3 py-1 bg-gray-800 rounded-full">
          <Text className="text-white text-sm">Playlists</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-3 py-1">
          <Text className="text-gray-400 text-sm">Artists</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-3 py-1">
          <Text className="text-gray-400 text-sm">Albums</Text>
        </TouchableOpacity>
      </View>

      {/* Recently Played Section */}
      <Text className="text-gray-400 px-4 py-2 text-sm">Recently played</Text>

      {/* List of Items */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};
export default LibraryScreen;
