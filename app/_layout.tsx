import FontProvider from "@/providers/font";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FontProvider>
        <Stack
          screenOptions={{ headerShown: false }}
        />
      </FontProvider>
    </SafeAreaProvider>
  );
}