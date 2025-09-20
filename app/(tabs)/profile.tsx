import { PostCard } from "@/components/home";
import { ProfileFriendsCards, ProfileHeader } from "@/components/profile";
import AbsoluteButton from "@/components/ui/absolute-button";
import Header from "@/components/ui/header";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import { BadgeCheck, CodeXmlIcon, MessageCircle, UserRoundCog } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
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
                        paddingHorizontal: 10,
                    },
                    animatedStyle,
                ]}
                // className={"w-full h-20 border px-4 border-b border-default"}
            >
                <View className="w-full h-full flex-row items-center justify-between">
                    <View className="h-16 w-auto flex-row gap-2 items-center">
                        <View className="w-16 h-full rounded-full overflow-hidden">
                            <Image
                                source={{
                                    uri: "https://img.freepik.com/premium-photo/portrait-successful-programmer-game-developer-coder-guy-uses-computer-laptop-work-game-design-hacker-boy-generative-ai-gamer-headphones_117038-5485.jpg",
                                }}
                                className="size-full rounded-full object-cover"
                            />
                        </View>
                        <View className="h-full justify-center gap-1">
                            <Text
                                className="text-lg font-poppins-semibold max-w-64"
                                numberOfLines={1}
                            >
                                Bapparaj sk
                            </Text>
                            <Text
                                className="text-sm font-poppins-semibold text-gray-950 min-w-64"
                                numberOfLines={1}
                            >
                                C.S.T - <Text className='font-poppins-medium text-gray-600'>First Year</Text>
                            </Text>
                        </View>
                    </View>
                    <Pressable className="p-2 rounded-full border border-default flex-row gap-1 items-center">
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

            <AbsoluteButton icon={<UserRoundCog color={"#ffffff"} />} />
        </SafeAreaView>
    );
}
