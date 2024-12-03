import React, { useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
//import {LinearGradient} from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/authContext";
import { fetchRecentItems } from "@/controllers/recentlyPlayedController";

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

const UserLibraryScreen = () => {
  const { user } = useAuth();
  const [recentItems, setRecentItems] = useState<LibraryItem[]>([]);
  const loadRecentItems = async () => {
    if (user) {
      const items = await fetchRecentItems(user.id);
      const formattedItems: LibraryItem[] = items.map((item) => ({
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
  const data: LibraryItem[] = [
    ...recentItems.map((item) => ({
      ...item,
    })),
  ];

  const renderItem = ({ item }: { item: LibraryItem }) => (
    <TouchableOpacity className="flex-row items-center justify-between p-4">
      <View className="flex-row items-center space-x-4">
        <Image
          source={{ uri: item.imageUrl }}
          className="w-12 h-12 rounded-md"
        />
        <View className="m-1">
          <Text className="text-white text-base">{item.name}</Text>
          <Text className="text-gray-400 text-sm">{item.info}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="gray" />
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
            // onPress={() => navigation.navigate("userSettings/index")}
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
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          className="mt-2"
        />
        <TouchableOpacity className="px-4 py-4">
          <Text className="text-gray-400">See all playlists</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserLibraryScreen;
