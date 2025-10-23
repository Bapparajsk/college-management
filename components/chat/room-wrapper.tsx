import { FlashList } from '@shopify/flash-list'
import React from 'react'
import RoomCard from './room-card'

export default function RoomWrapper() {
    return (
        <FlashList
            contentContainerStyle={{ padding: 12, paddingBottom: 150 }}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
            renderItem={({ item }) => (
                <RoomCard
                    title="Frontend Engineers Hangout"
                    description="Quick sync and code review"
                    participants={12}
                    avatars={[{ id: 1, initials: 'BR' }, { id: 2, uri: 'https://i.pravatar.cc/150?img=32' }, { id: 3, initials: 'AS' }, { id: 4, initials: 'MK' }]}
                    isLive={true}
                    onPress={() => console.log('open room')}
                    onJoin={() => console.log('join room')}
                />
            )}
        />
    )
}