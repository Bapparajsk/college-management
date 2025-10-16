import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import HeaderTabs from './header-tabs';
import PostCard from './post-card';

export default function PostList() {

    const [data, setData] = useState(Array.from({ length: 5 }, (_, i) => `Item ${i + 1}`));
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        console.log("Refreshing...");

        // Simulate network request
        setTimeout(() => {
            setData(Array.from({ length: data.length + 5 }, (_, i) => `Item ${i + 1}`));
            setRefreshing(false);
        }, 1500);
    }, []);

    return (
        <FlashList
            ListHeaderComponent={<HeaderTabs />}
            contentContainerStyle={{ paddingBottom: 100 }}
            data={data}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => (
                <PostCard />
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            scrollEventThrottle={16}
        />
    )
}