import FontProvider from "@/providers/font";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar
        animated={true}
        backgroundColor="#F1F1F1"
        barStyle="dark-content"
      />
      <FontProvider>
        <Stack

          screenOptions={{ headerShown: false }}
        />
      </FontProvider>
    </SafeAreaProvider>
  );
}