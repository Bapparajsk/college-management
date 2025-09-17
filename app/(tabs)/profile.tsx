import Header from "@/components/ui/header";
import { User } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <Header icon={<User size={29} />} title="Profile" />
        </SafeAreaView>
    );
}
