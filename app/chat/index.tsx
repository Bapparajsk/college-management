import ChatHeader from '@/components/chat/header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function index() {

    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ChatHeader/>
        </SafeAreaView>
    )
}