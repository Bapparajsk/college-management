import { decimalTo24h } from '@/utils/format';
import { FlashList } from '@shopify/flash-list';
import { default as dayjs } from 'dayjs';
import React, { useCallback, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import MemoizedRoutingCard from './routing-card';
import { getTodaysRoutine, RoutingDetails } from './routing-details';

export default function RoutingList() {
    const [refreshing, setRefreshing] = useState(false);
    const [routineData, setRoutineData] = useState<RoutingDetails[]>(() => getTodaysRoutine());

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        
        // Simulate reloading / API call
        setTimeout(() => {
            // This will force a re-fetch of the routine data
            const refreshedData = getTodaysRoutine();
            setRoutineData(refreshedData);
            setRefreshing(false);
        }, 1500);
    }, []);

    const toDayRoutine = React.useMemo(() => {
        const now = dayjs();
        const classes: RoutingDetails[] = routineData; // Use state data instead of direct call

        const running: RoutingDetails[] = [];
        const upcoming: RoutingDetails[] = [];
        const completed: RoutingDetails[] = [];

        for (const cls of classes) {
            const { start, end } = cls.time;

            const startTime = decimalTo24h(start);
            const endTime = decimalTo24h(end);

            const classStart = dayjs().hour(startTime.hour).minute(startTime.minute).second(0);
            const classEnd = dayjs().hour(endTime.hour).minute(endTime.minute).second(0);

            if (now.isBefore(classStart)) {
                upcoming.push(cls);
            } else if (now.isBefore(classEnd)) {
                running.push(cls);
            } else {
                completed.push(cls);
            }
        }

        upcoming.sort((a, b) => a.time.start - b.time.start);
        completed.sort((a, b) => a.time.end - b.time.end);

        return [
            { bar: "Ongoing", show: running.length > 0 },
            ...running,
            { bar: "Upcoming", show: upcoming.length > 0 },
            ...upcoming,
            { bar: "Completed", show: completed.length > 0 },
            ...completed,
        ];
    }, [routineData, refreshing]); // Add routineData as dependency

    return (
        <FlashList
            data={toDayRoutine}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) =>
                'bar' in item ? (
                    item.show ? (
                        <View className="px-2 rounded-md mt-4 mb-2">
                            <Text className="text-gray-700 font-poppins-semibold text-lg">{item.bar}</Text>
                        </View>
                    ) : null
                ) : (
                    <MemoizedRoutingCard {...item} />
                )
            }
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 150 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
        />
    );
}