import { StackScreenWithSearchBar } from "@/constants/Layout";
import { colors } from "@/constants/Tokens";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function SearchLayout() {
  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Search",
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}
