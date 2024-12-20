import React, { useEffect, useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ListRenderItem,
  Alert,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
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

import {
  getAllSong,
  getArtistWithId,
  getSongByUser,
} from "@/controllers/database";
import { TracksList } from "@/components/TrackList";
import { FilePlus2, X } from "lucide-react-native";
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
  imageUrl?: string;
  onPress?: () => void;
  item_id?: string;
};

const LibraryScreen = () => {
  const navigation = useNavigation<NavigationProp<LibraryParamList>>();
  const { user } = useAuth();
  const [recentItems, setRecentItems] = useState<LibraryItem[]>([]);
  const likedSongs = useSelector((state: RootState) => state.favorites.songs);
  const likedSongsCount = likedSongs.length;
  const [viewMode, setViewMode] = useState<"all" | "artists" | "albums">("all");
  const [songs, setSongs] = useState<Song[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const loadRecentItems = async () => {
    if (user) {
      const items = await fetchRecentItems(user.id);
      const filteredItems = items.filter(
        (item) => item.type === "album" || item.type === "artist"
      );
      const formattedItems: LibraryItem[] = filteredItems.map((item) => ({
        id: item.item_id,
        type: item.type,
        name: item.name,
        info: item.info,
        imageUrl: item.imageUrl,
        item_id: item.item_id,
      }));
      setRecentItems(formattedItems);
    }
  };
  const fetchFavoriteSongs = async () => {
    if (user) {
      const { data: favoriteSongs, error } = await supabase
        .from("FavoriteSong")
        .select("song_id, Song(*)")
        .eq("user_id", user.id);

      if (error) {
      } else {
        const songs = favoriteSongs.map((item) => item.Song);
        dispatch(setFavorites(songs as unknown as Song[]));
      }
    }
  };
  useEffect(() => {
    const fetchSongs = async () => {
      if (user?.id) {
        const songs = await getSongByUser(user.id);
        setSongs(songs);
      }
    };
    const fetchFullSongs = async () => {
      const songs = await getAllSong();
      setFullSong(songs);
    };
    fetchSongs();
    fetchFullSongs();
    fetchFavoriteSongs();
    loadRecentItems();
  }, [user, loadRecentItems, fetchFavoriteSongs]);
  const handleAddPlaylist = async () => {
    if (!newPlaylistName.trim()) {
      Alert.alert("Error", "Playlist name cannot be empty.");
      return;
    }
    const { data: existingPlaylists, error: fetchError } = await supabase
      .from("Playlist")
      .select("name")
      .eq("user_id", user?.id);

    if (fetchError) {
      console.error("Error fetching playlists:", fetchError);
      return;
    }

    const isDuplicate = existingPlaylists.some(
      (playlist) =>
        playlist.name.toLowerCase() === newPlaylistName.toLowerCase()
    );

    if (isDuplicate) {
      Alert.alert(
        "Error",
        "Playlist name already exists. Please choose a different name."
      );
      return;
    }

    const { data, error } = await supabase.from("Playlist").insert([
      {
        name: newPlaylistName,
        user_id: user?.id,
        imageUrl:
          "https://seurmazgxtotnrbiypmg.supabase.co/storage/v1/object/public/albumImage/default.png",
      },
    ]);

    if (error) {
      console.error("Error creating playlist:", error);
      Alert.alert("Error", "Failed to create playlist.");
    } else {
      Alert.alert("Success", "Playlist created successfully.");
      setIsModalVisible(false);
      setNewPlaylistName("");
    }
  };
  const renderItem: ListRenderItem<LibraryItem> = ({ item }) => (
    <TouchableOpacity
      className="flex-row items-center p-4"
      onPress={item.onPress}
    >
      {item.icon ? (
        <Ionicons
          name={item.icon as any}
          size={40}
          color="white"
          style={{ marginRight: 10, padding: 5 }}
        />
      ) : (
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            width: 50,
            height: 50,
            marginRight: 10,
            borderRadius: item.type === "artist" ? 25 : 5,
          }}
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
        songs: JSON.stringify(likedSongs),
      },
    });
  };
  const handleItemPress = async (item: LibraryItem) => {
    if (item.type === "song") {
      try {
        const { data: songData, error } = await supabase
          .from("Song")
          .select("id, title, artist_id, genre_id, imageUrl, url")
          .eq("id", item.item_id)
          .single();

        if (error || !songData) {
          Alert.alert("Error", "Failed to fetch song details.");
          return;
        }
        const artist = await getArtistWithId(songData.artist_id);

        const track = {
          id: songData.id,
          title: songData.title,
          artist_id: songData.artist_id,
          genre_id: songData.genre_id,
          artist_name: artist?.name,
          imageUrl: songData.imageUrl,
          url: songData.url,
        };

        //dispatch(playTrack(track));
      } catch (error) {
        console.error("Error fetching song details:", error);
        Alert.alert("Error", "An error occurred while fetching song details.");
      }
    } else if (item.type === "artist") {
      router.push({
        pathname: "/artist/[artistId]",
        params: {
          artistId: JSON.stringify(item.item_id),
        },
      });
    } else if (item.type === "album") {
      router.push({
        pathname: "/playlist/[albumId]",
        params: {
          albumId: JSON.stringify(item.item_id),
        },
      });
    }
  };
  const filteredItems = recentItems.filter((item) => {
    if (viewMode === "artists") return item.type === "artist";
    if (viewMode === "albums") return item.type === "album";
    return true; // "all" mode
  });
  const data: LibraryItem[] = [
    {
      id: "0",
      type: "album",
      name: "Liked Songs",
      info: `${likedSongsCount} songs`,
      icon: "heart",
      onPress: handleLikedSongsPress,
    },
    ...filteredItems.map((item) => ({
      ...item,
      onPress: () => handleItemPress(item),
    })),
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [fullSong, setFullSong] = useState<Song[]>([]);

  const handleAddSong = async () => {
    if (songTitle && songUrl) {
      const songData = {
        id: fullSong.length + 1,
        title: songTitle,
        url: songUrl,
        imageUrl:
          "https://seurmazgxtotnrbiypmg.supabase.co/storage/v1/object/public/albumImage/default.png",
        artist_id: 30, // Cập nhật theo thông tin người dùng
        genre_id: 1, // Cập nhật theo thể loại
      };

      try {
        const { data: insertedSong, error } = await supabase
          .from("Song")
          .insert(songData)
          .select("*")
          .single();

        if (error) {
          console.error("Error inserting song:", error);
          return;
        }

        // Liên kết bài hát với người dùng trong bảng UserSong
        const userSongData = {
          user_id: user?.id, // Cập nhật ID người dùng
          song_id: insertedSong.id, // ID của bài hát mới
        };

        await supabase.from("UserSong").insert([userSongData]);

        // Đóng modal sau khi hoàn thành
        setModalVisible(false);
        Alert.alert("Success", "Song added successfully!");
      } catch (error) {
        console.error("Error handling song insertion:", error);
      }
    }
  };

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
        <View className="flex-row items-center justify-center">
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Ionicons name="add" size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="pl-4"
          >
            <FilePlus2 color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Modal nhập thông tin bài hát */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View className="bg-black h-full pt-12 items-center ">
          <TextInput
            placeholder="Song URL"
            placeholderTextColor={"gray"}
            value={songUrl}
            onChangeText={setSongUrl}
            className="bg-white h-12 p-2 mb-4 w-full rounded-lg"
          />
          <TextInput
            placeholder="Song Title"
            placeholderTextColor={"gray"}
            value={songTitle}
            onChangeText={setSongTitle}
            className="bg-white h-12 p-2 mb-2 text-black w-full rounded-lg"
          />
          <View className="justify-end flex-row w-full mt-4">
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="w-20 h-12 rounded-lg border-white border items-center justify-center"
            >
              <Text className="text-white font-semibold text-lg ">Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAddSong}
              className="bg-[#1DB954] w-20 h-12 rounded-lg  items-center justify-center ml-4"
            >
              <Text className="text-white font-semibold text-lg ">Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Filter Section */}
      <View className="flex-row justify-between px-4 mb-4">
        <TouchableOpacity
          className={`px-3 py-1 rounded-full ${
            viewMode === "all" ? "bg-gray-800" : "bg-transparent"
          }`}
          onPress={() => setViewMode("all")}
        >
          <Text
            className={`text-sm ${
              viewMode === "all" ? "text-white" : "text-gray-400"
            }`}
          >
            Playlists
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-3 py-1 rounded-full ${
            viewMode === "artists" ? "bg-gray-800" : "bg-transparent"
          }`}
          onPress={() => setViewMode("artists")}
        >
          <Text
            className={`text-sm ${
              viewMode === "artists" ? "text-white" : "text-gray-400"
            }`}
          >
            Artists
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-3 py-1 rounded-full ${
            viewMode === "albums" ? "bg-gray-800" : "bg-transparent"
          }`}
          onPress={() => setViewMode("albums")}
        >
          <Text
            className={`text-sm ${
              viewMode === "albums" ? "text-white" : "text-gray-400"
            }`}
          >
            Albums
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recently Played Section */}
      <Text className="text-gray-400 px-4 py-2 text-sm">Recently played</Text>

      {/* List of Items */}
      <ScrollView>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          scrollEnabled={false}
        />

        <Text className="text-white px-4 py-2 text-md">Your music</Text>
        <TracksList
          songs={songs}
          sroll={false}
          nestedScroll={true}
          id={"userPlaylist"}
          onSelectSong={() => {}}
        />
      </ScrollView>
      <View className="mb-20"></View>
      {/* Modal for creating a new playlist */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        style={styles.modal}
        className="rounded-t-lg"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 bg-black/70 justify-center items-center mt-20 rounded-t-lg">
          <View className="w-full h-full p-6 bg-gray-800 rounded-none relative">
            {/* Nút tắt modal (dấu X) */}
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              className="absolute top-4 right-4"
            >
              <X size={24} color="white" />
            </TouchableOpacity>

            <Text className="text-white text-2xl font-semibold mb-4 text-center">
              Create New Playlist
            </Text>

            <TextInput
              placeholder="Enter playlist name"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
              className="bg-gray-700 text-white p-4 rounded mb-4 border border-gray-600"
            />

            <TouchableOpacity
              onPress={handleAddPlaylist}
              className="bg-green-500 py-3 px-6 rounded-full justify-center items-center mt-4"
            >
              <Text className="text-white text-base font-semibold">Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    margin: 0,
  },
});
export default LibraryScreen;
