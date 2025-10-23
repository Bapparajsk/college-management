import { FlashList } from '@shopify/flash-list'
import React from 'react'
import ChatCard from './chat-card'

export default function RoomWrapper() {
    return (
        <FlashList
            contentContainerStyle={{ padding: 6, paddingBottom: 150 }}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
            renderItem={({ item }) => (
                <ChatCard
                    user={{ name: "John Doe", profileImageUrl: "https://i.pravatar.cc/150?img=32" }}
                    lastMessage='Hey, are we still on for the meeting tomorrow? Let me know!'
                    timestamp='2:45 PM'
                    unreadCount={3}
                />
            )}
        />
    )
}