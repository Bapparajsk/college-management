import { PostCard } from "@/components/home";
import { ProfileFriendsCards, ProfileHeader, ProfileSetting } from "@/components/profile";
import Header from "@/components/ui/header";
import User from "@/components/ui/user";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import { BadgeCheck, CodeXmlIcon, MessageCircle } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollOffset } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {

    const flashListRef = useAnimatedRef<FlashListRef<any>>();
    const scrollOffset = useScrollOffset(flashListRef);

    const animatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollOffset.value,
            [200, 250], // start fading in around 200, visible at 250
            [0, 1],
            "clamp"
        );

        const translateY = interpolate(
            scrollOffset.value,
            [200, 250],
            [20, 0], // small slide up
            "clamp"
        );

        return {
            opacity,
            transform: [{ translateY }],
        };
    });


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                icon={<CodeXmlIcon size={26} stroke={"#3178C6"} strokeWidth={2.5} />}
                title={
                    <View className="flex-row items-center">
                        <Text className="text-2xl font-inter-semibold items-center mr-1">
                            Bapparaj sk
                        </Text>
                        <Text className="text-base font-inter-medium mr-1 mt-1">(Developer)</Text>
                        <BadgeCheck size={20} color={"#1DA1F2"} style={{ marginTop: 2 }} />
                    </View>
                }
            />

            <Animated.View
                style={[
                    {
                        position: "absolute",
                        top: 80,
                        left: 0,
                        right: 0,
                        height: 70,
                        backgroundColor: "#F2F2F2",
                        borderBottomWidth: 1,
                        borderColor: "#ddd",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10,
                        marginTop: 8,
                        paddingHorizontal: 10,
                    },
                    animatedStyle,
                ]}
            >
                <View className="w-full h-full flex-row items-center justify-between ">
                    <User />
                    <Pressable className="py-2 px-3 rounded-full border border-default flex-row gap-1 items-center">
                        <MessageCircle size={18} color={"#000000aa"} />
                        <Text className="text-base font-poppins-semibold text-gray-800">
                            Message
                        </Text>
                    </Pressable>
                </View>
            </Animated.View>

            <FlashList
                ref={flashListRef}
                ListHeaderComponent={
                    <>
                        <ProfileHeader />
                        <ProfileFriendsCards />
                        <Text className="text-gray-800 font-poppins-semibold text-lg my-2 px-4">
                            Notices
                        </Text>
                    </>
                }
                contentContainerStyle={{ paddingBottom: 100 }}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                renderItem={() => <PostCard />}
            />
            <ProfileSetting />
        </SafeAreaView>
    );
}
