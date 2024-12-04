import React, { useEffect, useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
//import {LinearGradient} from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import { useAuth } from "@/hooks/authContext";
import supabase from "@/utils/supabase";
import { useRouter } from "expo-router";
import { updateUser } from "@/redux/authSlice";
import { useDispatch } from "react-redux";

// Get screen dimensions
const { height } = Dimensions.get("window");

const UserLibraryScreen = () => {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const handleEditProfile = () => {
    setModalVisible(true);
  };

  const handleSaveUsername = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("User") // Replace with your actual users table name
      .update({ user_name: username })
      .eq("id", user.id);

    if (error) {
      console.log("Error updating username:", error);
    } else {
      dispatch(updateUser({ ...user, user_name: username }));
      console.log("Username updated successfully:", data);
    }
    setModalVisible(false);
  };

  useEffect(() => {
    const loadPlaylists = async () => {
      if (user) {
        const { data: playlists, error: playlistError } = await supabase
          .from("Playlist")
          .select("*")
          .eq("user_id", user.id);

        if (playlistError) {
          console.log("Error fetching playlists:", playlistError);
          return;
        }

        // Fetch song counts for each playlist
        const playlistsWithCounts = await Promise.all(
          playlists.map(async (playlist) => {
            const { count, error: countError } = await supabase
              .from("PlaylistSong")
              .select("song_id", { count: "exact" })
              .eq("playlist_id", playlist.id);

            if (countError) {
              console.log(
                `Error fetching song count for playlist ${playlist.id}:`,
                countError
              );
              return { ...playlist, song_count: 0 };
            }

            return { ...playlist, song_count: count };
          })
        );

        setPlaylists(playlistsWithCounts);
      }
    };
    loadPlaylists();
  }, [user, playlists]);

  const handlePlaylistPress = (playlistId: number) => {
    router.push({
      pathname: "/playlist/[albumId]",
      params: {
        albumId: playlistId,
        isPlaylist: "true",
      },
    });
  };
  const renderPlaylistItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="flex-row items-center justify-between p-4"
      onPress={() => handlePlaylistPress(item.id)}
    >
      <View className="flex-row items-center space-x-4">
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <View className="m-1">
          <Text className="text-white text-base font-semibold">
            {item.name}
          </Text>
          <Text className="text-gray-400 text-sm">{item.song_count} songs</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <LinearGradient
        colors={["#015a6d", "#072329"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View className="items-center pt-8 pb-4">
          <Image
            source={{
              uri: user?.urlImage,
            }}
            className="w-24 h-24 rounded-full"
          />
          <TouchableOpacity
            className="mt-4 bg-gray-600 py-1 px-4 rounded-full"
            onPress={handleEditProfile}
          >
            <Text className="text-white text-sm">Edit Profile</Text>
          </TouchableOpacity>
          <View className="flex-row justify-center space-x-8 mt-4">
            <View className="items-center mx-4">
              <Text className="text-white font-bold text-lg mx-4">23</Text>
              <Text className="text-white text-xs mx-4">PLAYLISTS</Text>
            </View>
            <View className="items-center mx-4">
              <Text className="text-white font-bold text-lg mx-4">58</Text>
              <Text className="text-white text-xs mx-4">FOLLOWERS</Text>
            </View>
            <View className="items-center mx-4">
              <Text className="text-white font-bold text-lg mx-4">43</Text>
              <Text className="text-white text-xs mx-4">FOLLOWING</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Playlist Section */}
      <View className="flex-1 mt-6">
        <Text className="text-white text-lg px-4">Playlists</Text>
        <FlatList
          data={playlists}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id}
          className="mt-2"
        />
        <TouchableOpacity className="px-4 py-4">
          <Text className="text-gray-400">See all playlists</Text>
        </TouchableOpacity>
      </View>
      {/* Edit Username Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View className="flex-1 justify-end">
          <View
            style={{ height: height * 0.67 }}
            className="bg-zinc-800 w-full rounded-t-3xl"
          >
            {/* Header */}
            <View className="flex-row justify-between items-center p-6 border-b border-zinc-700">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-zinc-400">Cancel</Text>
              </TouchableOpacity>
              <Text className="text-white text-lg font-bold">Edit Profile</Text>
              <TouchableOpacity onPress={handleSaveUsername}>
                <Text className="text-green-500">Save</Text>
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View className="flex-1 justify-center px-5">
              <Text className="text-white text-base mb-2 text-center">
                Username
              </Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                className="bg-zinc-700 text-white p-4 mx-5 rounded-xl text-center"
                placeholder="Enter new username"
                placeholderTextColor="#666"
              />

              <TouchableOpacity
                className="bg-green-500 mx-5 p-4 rounded-xl mt-6"
                onPress={handleSaveUsername}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  Save Changes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserLibraryScreen;
