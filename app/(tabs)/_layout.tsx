import { Tabs } from "expo-router";
import React from "react";
import { colors, fontSize } from "@/constants/Tokens";
import { House, Search, Library } from "lucide-react-native";
export default function TabLayout() {
  return (
    <>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: {
            fontSize: fontSize.xs,
            fontWeight: "500",
            paddingTop: 5,
          },
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            paddingBottom: 5,
            paddingTop: 10,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <House size={26} color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => <Search size={26} color={color} />,
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color }) => <Library size={26} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
