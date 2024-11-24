import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const data = [
  {
    id: "1",
    title: "Account",
  },
  {
    id: "2",
    title: "Data Saver",
  },
  {
    id: "3",
    title: "Languages",
  },
  {
    id: "4",
    title: "Playback",
  },
  {
    id: "5",
    title: "Explicit Content",
  },
  {
    id: "6",
    title: "Devices",
  },
  {
    id: "7",
    title: "Car",
  },
  {
    id: "8",
    title: "Social",
  },
  {
    id: "9",
    title: "Voice Assistant & Apps",
  },
  {
    id: "10",
    title: "Audio Quality",
  },
  {
    id: "11",
    title: "Storage",
  },
];
const SettingsScreen = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <View className="flex-1 bg-black px-4">
      <View className="flex-row items-center">
        <TouchableOpacity>
          <Image
            style={{ width: 40, height: 40, borderRadius: 40 }}
            source={{
              uri: user?.urlImage,
            }}
            alt="Profile image"
          />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold px-4">Settings</Text>
      </View>
      <ScrollView className="mt-4">
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-row items-center justify-between p-4"
          >
            <Text className="text-white">{item.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
