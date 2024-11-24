import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { AuthProvider } from "@/hooks/authContext";
import store from "@/redux/store";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="dark">
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider value={DarkTheme}>
            <Stack
              screenOptions={{
                headerShown: false, // Tắt header mặc định cho tất cả màn hình trong Stack
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="account/login"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="player"
                options={{
                  presentation: "card",
                  gestureEnabled: true,
                  gestureDirection: "vertical",
                  animationDuration: 400,
                  headerShown: false,
                }}
              />
            </Stack>
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    </GluestackUIProvider>
  );
}
