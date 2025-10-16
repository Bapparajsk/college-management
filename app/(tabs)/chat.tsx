import { Wrapper } from '@/components/chat';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Chat() {
    return (
        <SafeAreaView style={{ flex: 1}}>
            <Wrapper/>
        </SafeAreaView>
    )
}