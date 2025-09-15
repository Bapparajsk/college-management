import { RoutingCard, RoutingDetails } from '@/components/routine'
import Header from '@/components/ui/header'
import { FlashList } from '@shopify/flash-list'
import { CalendarDays } from 'lucide-react-native'
import { useMemo } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Routine() {

    const toDayRoutine = useMemo(() => RoutingDetails.getTodaysRoutine, [])
    // 

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                icon={<CalendarDays />}
                title={"Today's Class"}
            />

            <View className="flex-1">
                <FlashList
                    data={toDayRoutine()}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <RoutingCard {...item} />}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true} // ✅ free memory offscreen
                    contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 8, paddingBottom: 100 }}
                />
            </View>
        </SafeAreaView>
    )
}
