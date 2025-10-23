import { cn } from '@/utils/cn';
import { MessageSquareText, MonitorPlay, Search, UserPlus, Video } from 'lucide-react-native';
import { Fragment, useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import AbsoluteButton from '../ui/absolute-button';
import { Button } from '../ui/button';
import ChatWrapper from './chat-wrapper';
import RoomWrapper from './room-wrapper';

export default function Wrapper() {

    const [page, setPage] = useState(0);
    const { width } = useWindowDimensions();

    return (
        <Fragment>
            <View className="w-full h-16 flex items-center justify-center px-2 pt-2">
                <Button className='w-full bg-gray-300 justify-start' variant='bordered' size='lg' radius='full' >
                    <Search size={20} color="#555" />
                    <Text className='text-lg font-poppins-medium text-[#555] ml-1'>Search chat, Room...</Text>
                </Button>
            </View>
            <View className='w-full h-10 flex-row border-b border-default justify-start items-center'>
                <Button onPress={() => setPage(0)} size='sm' variant='light' className='h-8'>
                    <View className='flex-row items-center gap-1'>
                        <MessageSquareText size={16} strokeWidth={2.3} color={page === 0 ? "#3b82f6" : "#6b7280"} />
                        <Text className={cn('text-base font-poppins-semibold', page === 0 ? "text-blue-500" : "text-gray-500")}>Chats</Text>
                    </View>
                </Button>
                <Button onPress={() => setPage(1)} size='sm' variant='light' className='h-8'>
                    <View className='flex-row items-center gap-1'>
                        <MonitorPlay size={16} strokeWidth={2.3} color={page === 1 ? "#3b82f6" : "#6b7280"} />
                        <Text className={cn('text-base font-poppins-semibold', page === 1 ? "text-blue-500" : "text-gray-500")}>Rooms</Text>
                    </View>
                </Button>
            </View>
            <View style={{ flex: 1 }}>
                <PagerView
                    style={{ flex: 1 }}
                    initialPage={0}
                    onPageSelected={e => setPage(e.nativeEvent.position)}
                >
                    <View key="1" style={{ width }}>
                        <ChatWrapper />
                    </View>

                    <View key="2" style={{ width }}>
                        <RoomWrapper />
                    </View>
                </PagerView>

                {/* Optional active indicator */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 12 }}>
                    {[0, 1].map(i => (
                        <View
                            key={i}
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                marginHorizontal: 4,
                                backgroundColor: page === i ? '#007bff' : '#ccc',
                            }}
                        />
                    ))}
                </View>
            </View>
            <AbsoluteButton icon={page === 0 ? <UserPlus color={"#ffffff"} /> : <Video color={"#ffffff"} />} />
        </Fragment>
    );
}