import { Tabs } from "expo-router";
import React from "react";
import { colors, fontSize } from "@/constants/Tokens";
import { House, Search, Library } from "lucide-react-native";
import FloatingPlayer from "@/components/FloatingPlayer";
export default function TabLayout() {
  return (
    <>
      <Tabs
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
            backgroundColor: "rgba(0,0,0,0.85)",
            height: 48,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <House size={22} color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => <Search size={22} color={color} />,
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color }) => <Library size={22} color={color} />,
          }}
        />
      </Tabs>
      <FloatingPlayer
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          bottom: 49,
          zIndex: 1,
        }}
      />
    </>
  );
}
