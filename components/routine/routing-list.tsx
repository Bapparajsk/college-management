import { FlashList } from '@shopify/flash-list';
import React from 'react';
// import RoutingCard from './routing-card'
import { decimalTo24h } from '@/utils/format';
import { default as dayjs } from 'dayjs';
import { Text, View } from 'react-native';
import MemoizedRoutingCard from './routing-card';
import { getTodaysRoutine, RoutingDetails } from './routing-details';

export default function RoutingList() {

    const toDayRoutine = React.useMemo(() => {
        const now = dayjs()


        const classes: RoutingDetails[] = getTodaysRoutine();

        const running: RoutingDetails[] = [];
        const upcoming: RoutingDetails[] = [];
        const completed: RoutingDetails[] = [];

        for (const cls of classes) {
            const { start, end } = cls.time;

            const startTime = decimalTo24h(start);
            const endTime =  decimalTo24h(end);

            const classStart = dayjs().hour(startTime.hour).minute(startTime.minute).second(0);
            const classEnd = dayjs().hour(endTime.hour).minute(endTime.minute).second(0);

            if (now.isBefore(classStart)) {
                upcoming.push(cls)
                // return { status: "Upcoming", shouldShowCountdown: true };
            } else if (now.isBefore(classEnd)) {
                running.push(cls);
            } else {
                completed.push(cls)
            }
            // return { status: "Completed", shouldShowCountdown: false };
        }

        // sort upcoming by start time
        upcoming.sort((a, b) => a.time.start - b.time.start);
        // sort completed by end time (latest last)
        completed.sort((a, b) => a.time.end - b.time.end);

        return [{ bar: "Ongoing" }, ...running, { bar: "Upcoming" }, ...upcoming, { bar: "Completed" }, ...completed];
    }, []);


    return (
        <FlashList
            data={toDayRoutine}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                'bar' in item ? (
                    <View className='px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-md mt-4 mb-2'>
                        <Text className='text-gray-700 dark:text-gray-300 font-semibold text-lg'>{item.bar}</Text>
                    </View>
                ) : (
                    <MemoizedRoutingCard {...item} />
                )
            )}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true} // ✅ free memory offscreen
            contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 8, paddingBottom: 100 }}
        />
    )
}