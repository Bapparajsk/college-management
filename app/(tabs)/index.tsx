import { PostCard } from "@/components/home";
import { Link } from "expo-router";
import { MessageSquarePlus, School } from "lucide-react-native";
import { Pressable, RefreshControl } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useState } from "react";
import Header from "@/components/ui/header";

export default function Index() {
    const insets = useSafeAreaInsets();

    const [data, setData] = useState(Array.from({ length: 5 }, (_, i) => `Item ${i + 1}`));
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        console.log("Refreshing...");

        // Simulate network request
        setTimeout(() => {
            setData(Array.from({ length: data.length + 5 }, (_, i) => `Item ${i + 1}`));
            setRefreshing(false);
        }, 1500);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Header icon={<School size={24} />} title="EIEM" />
            <Pressable style={{ bottom: insets.bottom + 90 }}
                className="absolute right-5 z-10 size-16 rounded-2xl bg-[#0D1017] flex items-center justify-center">
                <Link href="/new-post" asChild push>
                    <MessageSquarePlus color={"#FFFFFF"} />
                </Link>
            </Pressable>
            <FlashList
                contentContainerStyle={{ paddingBottom: 100 }}
                data={data}
                keyExtractor={(index) => index.toString()}
                renderItem={({ item }) => (
                    <PostCard />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                scrollEventThrottle={16}
            />
        </SafeAreaView>
    );
}
