import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { Provider } from "react-redux";
import store from "@/redux/store";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="dark">
      <Provider store={store}>
        <ThemeProvider value={DarkTheme}>
          <Stack>
            <Stack.Screen
              name="signup"
              options={{
                headerShown: false,
                //presentation: "modal", // Ẩn thanh tab ở trang login
              }}
            />
            <Stack.Screen
              name="login"
              options={{
                headerShown: false,
                //presentation: "modal", // Ẩn thanh tab ở trang login
              }}
            />
          </Stack>
        </ThemeProvider>
      </Provider>
    </GluestackUIProvider>
  );
}
