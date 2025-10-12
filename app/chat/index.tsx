import { ChatHeader, ChatList } from '@/components/chat';
import Input from '@/components/ui/input';
import { Link } from 'expo-router';
import { Search } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function index() {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ChatHeader />
            <View className="w-full h-20 flex items-center justify-center">
                <Input
                    startContent={<Search size={20} color="#555" />}
                    placeholder='Search chat...'
                />
            </View>
            <Link href="/chat/user">
                <Text>User</Text>
            </Link>
            <ChatList/>
        </SafeAreaView>
    )
}