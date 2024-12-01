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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setFavorites } from "@/redux/favoritesSlice";
import { fetchRecentItems } from "@/controllers/recentlyPlayedController";
type LibraryParamList = {
  index: undefined;
  "userLibrary/index": undefined;
  "userSettings/index": undefined;
};
type LibraryItem = {
  id: string;
  type: "album" | "artist" | "song";
  name: string;
  info?: string;
  icon?: string;
  imageUri?: string;
  onPress?: () => void;
};

const LibraryScreen = () => {
  const navigation = useNavigation<NavigationProp<LibraryParamList>>();
  const { user } = useAuth();
  const [recentItems, setRecentItems] = useState<LibraryItem[]>([]);
  const likedSongs = useSelector((state: RootState) => state.favorites.songs);
  const likedSongsCount = likedSongs.length;
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const loadRecentItems = async () => {
      if (user) {
        const items = await fetchRecentItems(user.id);
        const formattedItems: LibraryItem[] = items.map((item) => ({
          id: item.item_id,
          type: item.type,
          name: item.type === "song" ? "Song Name" : "Playlist Name", // Replace with actual name lookup
          timestamp: item.timestamp,
        }));
        setRecentItems(formattedItems);
      }
    };
    const fetchFavoriteSongs = async () => {
      if (user) {
        const { data: favoriteSongs, error } = await supabase
          .from("FavoriteSong")
          .select("song_id, Song(*)") // Ensure 'Song' is the correct table name
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching favorite songs:", error);
        } else {
          const songs = favoriteSongs.map((item) => item.Song);
          dispatch(setFavorites(songs as unknown as Song[]));
        }
      }
    };

    fetchFavoriteSongs();
    loadRecentItems();
  }, [user, dispatch]);

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
      id: "0",
      type: "album",
      name: "Liked Songs",
      info: `${likedSongsCount} songs`,
      icon: "heart",
      onPress: handleLikedSongsPress,
    },
    ...recentItems,
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
