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
        <Button className='h-20 px-0 active:scale-100' radius='lg' variant='light' size='lg' >
            <View className='w-full h-full flex-row items-center justify-between gap-1 px-2'>
                <User
                    avatarUrl={user.profileImageUrl}
                    name={user.name}
                    department={lastMessage}
                    titleClassName='text-gray-500'
                />
                <View>
                    <Text className='text-[12px] font-poppins-medium text-right text-green-600'>
                        {timestamp}
                    </Text>
                    <View className='w-full items-center'>
                        <View className='size-5 bg-green-500 rounded-full justify-center items-center'>
                            <Text className='text-white font-poppins-medium text-[12px] mt-0.5'>
                                {unreadCount}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Button>
    )
}