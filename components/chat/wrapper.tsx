import { cn } from '@/utils/cn';
import { MessageSquareText, MonitorPlay, Search, Video } from 'lucide-react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import AbsoluteButton from '../ui/absolute-button';
import { Button } from '../ui/button';
import Input from '../ui/input';


export default function Wrapper() {

    const [isChats, setIsChats] = useState(true);

    const handleToggle = (type: "chats" | "rooms") => setIsChats(type === "chats");

    return (
        <>
            <View className="w-full h-16 flex items-center justify-center px-2 pt-2">
                <Input
                    startContent={<Search size={20} color="#555" />}
                    placeholder='Search chat, Room...'
                />
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
            <AbsoluteButton icon={<Video color={"#ffffff"} />} />
        </>
    );
}