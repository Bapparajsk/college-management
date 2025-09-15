import FontProvider from "@/providers/font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
        <FontProvider>
          <Stack
            screenOptions={{ headerShown: false }}
          />
        </FontProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}