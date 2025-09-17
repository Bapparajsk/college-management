import { PostCard } from "@/components/home";
import AbsoluteButton from "@/components/ui/absolute-button";
import Header from "@/components/ui/header";
import { FlashList } from "@shopify/flash-list";
import { MessageSquarePlus, School } from "lucide-react-native";
import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    

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
            <AbsoluteButton icon={<MessageSquarePlus color={"#ffffff"} />} />
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
