import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
//import {LinearGradient} from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthState } from "@/hooks/useAuthState";

type PlaylistItem = {
  id: string;
  name: string;
  likes: number;
  imageUri: string;
};

const data: PlaylistItem[] = [
  {
    id: "1",
    name: "Shazam",
    likes: 7,
    imageUri:
      "https://instagram.fsgn2-9.fna.fbcdn.net/v/t51.29350-15/462474156_1186202679107624_4308376934953324283_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3NTEuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fsgn2-9.fna.fbcdn.net&_nc_cat=1&_nc_ohc=DUOxalKfVkIQ7kNvgFpOh9C&_nc_gid=3b89bf22d77649b79c02d5c384903519&edm=AONqaaQBAAAA&ccb=7-5&ig_cache_key=MzQ3NDk0ODQ2NDkxODM1MTQ0Nw%3D%3D.3-ccb7-5&oh=00_AYC7G3PRB_KKQT1yCJl18N60kABOMc1ppLat6a0PLl6Fyw&oe=670F3F3D&_nc_sid=4e3341",
  },
  {
    id: "2",
    name: "Roadtrip",
    likes: 4,
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI9vn8ZoodGfNCU50lWSucaQWuMXyyYXhhpQ&s",
  },
  {
    id: "3",
    name: "Study",
    likes: 5,
    imageUri:
      "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpgs",
  },
];

const UserLibraryScreen = () => {
  // const navigation = useNavigation<NavigationProp<LibraryParamList>>();
  const user = useAuthState();
  const renderItem = ({ item }: { item: PlaylistItem }) => (
    <TouchableOpacity className="flex-row items-center justify-between p-4">
      <View className="flex-row items-center space-x-4">
        <Image
          source={{ uri: item.imageUri }}
          className="w-12 h-12 rounded-md"
        />
        <View className="m-1">
          <Text className="text-white text-base">{item.name}</Text>
          <Text className="text-gray-400 text-sm">{item.likes} likes</Text>
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
