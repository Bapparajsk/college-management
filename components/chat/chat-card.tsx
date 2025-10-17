import React from 'react'
import { Text, View } from 'react-native'
import { Button } from '../ui/button'
import User from '../ui/user'

export type ChatCardProps = {
    user: {
        name: string;
        profileImageUrl?: string;
    };
    lastMessage: string;
    timestamp?: string;
    unreadCount?: number;
}

export default function ChatCard({ user, lastMessage, timestamp, unreadCount }: ChatCardProps) {
    return (
        <Button className='h-20 px-0' radius='lg' variant='light' size='lg' >
            <View className='w-full h-full flex-row items-center justify-between gap-1'>
                <User
                    avatarUrl={user.profileImageUrl}
                    name={user.name}
                    department={lastMessage}
                    titleClassName='text-gray-500 max-w-80'
                />
                <View className='gap-1'>
                    <Text className='text-sm font-poppins-medium text-right text-green-600'>
                        {timestamp}
                    </Text>
                    <View className='w-full items-center'>
                        <Text className='w-fit bg-green-600 text-white font-poppins-medium text-xs px-2 py-1 rounded-full text-center'>
                            {unreadCount}
                        </Text>
                    </View>
                </View>
            </View>
        </Button>
    )
}