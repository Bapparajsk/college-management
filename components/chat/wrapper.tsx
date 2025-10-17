import { cn } from '@/utils/cn';
import { FlashList } from '@shopify/flash-list';
import { MessageSquareText, MonitorPlay, Search, UserPlus, Video } from 'lucide-react-native';
import { Fragment, useState } from 'react';
import { Text, View } from 'react-native';
import AbsoluteButton from '../ui/absolute-button';
import { Button } from '../ui/button';
import RoomCard from './room-card';

export default function Wrapper() {

    const [isChats, setIsChats] = useState(true);
    const handleToggle = (type: "chats" | "rooms") => setIsChats(type === "chats");

    return (
        <Fragment>
            <View className="w-full h-16 flex items-center justify-center px-2 pt-2">
                <Button className='w-full bg-gray-300 justify-start' variant='bordered' size='lg' radius='full' >
                    <Search size={20} color="#555" />
                    <Text className='text-lg font-poppins-medium text-[#555] ml-1'>Search chat, Room...</Text>
                </Button>
            </View>
            <View className='w-full h-10 flex-row border-b border-default justify-start items-center'>
                <Button onPress={() => handleToggle("chats")} size='sm' variant='light' className='h-8'>
                    <View className='flex-row items-center gap-1'>
                        <MessageSquareText size={16} strokeWidth={2.3} color={isChats ? "#3b82f6" : "#6b7280"} />
                        <Text className={cn('text-base font-poppins-semibold', isChats ? "text-blue-500" : "text-gray-500")}>Chats</Text>
                    </View>
                </Button>
                <Button onPress={() => handleToggle("rooms")} size='sm' variant='light' className='h-8'>
                    <View className='flex-row items-center gap-1'>
                        <MonitorPlay size={16} strokeWidth={2.3} color={isChats ? "#6b7280" : "#3b82f6"} />
                        <Text className={cn('text-base font-poppins-semibold', isChats ? "text-gray-500" : "text-blue-500")}>Rooms</Text>
                    </View>
                </Button>
            </View>
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
            <AbsoluteButton icon={isChats ? <UserPlus color={"#ffffff"} /> : <Video color={"#ffffff"} />} />
        </Fragment>
    );
}