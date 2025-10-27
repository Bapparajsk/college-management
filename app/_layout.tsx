import FontProvider from "@/providers/font";
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";

import { BottomSheetProvider } from "@/context/bottom-sheet-context";
import "./global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, zIndex: 9999 }}>
      <SafeAreaProvider>
        <StatusBar
          animated={true}
          backgroundColor="#F1F1F1"
          barStyle="dark-content"
        />
        <PortalHost />
        <FontProvider>
          <BottomSheetProvider>
            <Stack
              screenOptions={{ headerShown: false }}
            />
          </BottomSheetProvider>
        </FontProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}