import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
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
        <ThemeProvider value={DarkTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="login"
              options={{
                headerShown: false,
                //presentation: "modal", // Ẩn thanh tab ở trang login
              }}
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
            <Stack.Screen
              name="signup"
              options={{
                headerShown: false,
                //presentation: "modal", // Ẩn thanh tab ở trang signup
              }}
            />
          </Stack>
        </ThemeProvider>
      </Provider>
    </GluestackUIProvider>
  );
}
