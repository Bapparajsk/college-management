import { PostList } from "@/components/home";
import AbsoluteButton from "@/components/ui/absolute-button";
import Header from "@/components/ui/header";
import { MessageSquarePlus, School } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {


    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Header icon={<School size={24} />} title="EIEM" />
            <AbsoluteButton icon={<MessageSquarePlus color={"#ffffff"} />}/>
            <PostList />
        </SafeAreaView>
    );
}
