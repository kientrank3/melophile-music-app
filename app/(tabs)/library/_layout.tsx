import { StackScreenWithSearchBar } from "@/constants/Layout";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function LibraryLayout() {
  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Library",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="userLibrary/index"
          options={{
            headerTitle: "User Library",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="userSettings/index"
          options={{
            headerTitle: "User Settings",
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}
