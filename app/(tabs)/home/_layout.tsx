import { StackScreenWithSearchBar } from "@/constants/Layout";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function HomeLayout() {
  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Home",
            headerShown: true,
          }}
        />
      </Stack>
    </View>
  );
}
