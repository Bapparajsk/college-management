import Header from "@/components/ui/header";
import { BadgeCheck } from "lucide-react-native";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Header
                icon={
                    <Image
                        source={require('../../assets/icon-image/coding.png')}
                        className="w-8 h-8 rounded-full border border-blue-500 object-cover"
                    />
                }
                title={
                    <View className="flex-row items-center">
                        <Text className="text-2xl font-inter-semibold">Bapparaj sk </Text>
                        <Text className="text-base font-inter-medium">(Developer)</Text>
                        <BadgeCheck />
                    </View>
                } />
        </SafeAreaView>
    );
}
