import { StackScreenWithSearchBar } from "@/constants/Layout";
import { colors } from "@/constants/Tokens";
import { Slot, Stack } from "expo-router";
import { View } from "react-native";

export default function SearchLayout() {
  return <Slot screenOptions={{ headerShown: false }} />;
}
