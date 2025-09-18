import { PostCard } from "@/components/home";
import { ProfileFriendsCards, ProfileHeader } from "@/components/profile";
import AbsoluteButton from "@/components/ui/absolute-button";
import Header from "@/components/ui/header";
import { FlashList } from "@shopify/flash-list";
import { BadgeCheck, CodeXmlIcon, UserRoundCog } from "lucide-react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    return (
        <SafeAreaView style={{ flex: 1}}>
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

            <FlashList
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
