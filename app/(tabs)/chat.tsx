import { Wrapper } from '@/components/chat';
import Header from '@/components/ui/header';
import { MessagesSquare } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Chat() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header icon={<MessagesSquare size={24} />} title="Chats" />
            <Wrapper />
        </SafeAreaView>
    )
}