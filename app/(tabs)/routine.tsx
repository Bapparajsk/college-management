import { RoutingList } from '@/components/routine'
import AbsoluteButton from '@/components/ui/absolute-button'
import Header from '@/components/ui/header'
import { CalendarCog, CalendarDays } from 'lucide-react-native'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Routine() {
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                icon={<CalendarDays />}
                title={"Today's Class"}
            />
            <AbsoluteButton icon={<CalendarCog color={"#ffffff"} />} className='bg-[#0D1017]'/>
            <View className="flex-1">
                <RoutingList/>
            </View>
        </SafeAreaView>
    )
}
