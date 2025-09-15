import { Tabs, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, Text, Pressable } from "react-native";
import { CalendarDays, House, Building2, UserRound, GraduationCap } from "lucide-react-native";
import { useCallback } from "react";

const TabsScreenList = [
    {
        name: "index",
        title: "Home",
        icon: House,
    },
    {
        name: "faculty",
        title: "Faculty",
        icon: GraduationCap,
    },
    {
        name: "routine",
        title: "Routine",
        icon: CalendarDays,
    },
    {
        name: "departments",
        title: "Departments",
        icon: Building2,
    },
    {
        name: "profile",
        title: "Profile",
        icon: UserRound,
    }
];

export default function TabsLayout() {
    const insets = useSafeAreaInsets();
    const pathname = usePathname();

    const isActiveRoute = useCallback((routeName: string) => {

        if (routeName === "index") {
            return pathname === "/";
        }

        return pathname === `/${routeName}`;
    }, [pathname]);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 0, // ✅ Safe-area aware
                    height: 80 + insets.bottom,
                    backgroundColor: "#ffffff",
                    elevation: 8,
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 6 },
                    shadowRadius: 10,
                    overflow: Platform.OS === "android" ? "hidden" : "visible",
                    borderTopWidth: 1,
                    borderTopColor: "#bdbdc2",
                }
            }}
        >
            {TabsScreenList.map((tab) => (
                <Tabs.Screen
                    name={tab.name}
                    key={tab.name}
                    options={{
                        title: tab.title,
                        tabBarButton: (props) => {
                            return (
                                <Pressable
                                    style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                                    onPress={props.onPress}
                                >
                                    <tab.icon
                                        size={24}
                                        color={isActiveRoute(tab.name) ? "#007AFF" : "#8e8e93"}
                                        style={{ marginBottom: 4 }}
                                    />
                                    <Text style={{ color: isActiveRoute(tab.name) ? "#000" : "#8e8e93" }} className="capitalize text-sm font-poppins-semibold">{tab.title}</Text>
                                </Pressable>
                            );
                        },
                    }}
                />
            ))}
        </Tabs>
    );
}