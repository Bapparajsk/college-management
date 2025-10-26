import { cn } from '@/utils/cn';
import { MessageSquareText, MonitorPlay, Plus, Search, UserPlus, Video } from 'lucide-react-native';
import { Fragment, useRef, useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import AbsoluteButton from '../ui/absolute-button';
import { Button } from '../ui/button';
import ChatWrapper from './chat-wrapper';
import RoomWrapper from './room-wrapper';

export default function Wrapper() {

    const [page, setPage] = useState(0);
    const { width } = useWindowDimensions();
    const pagerRef = useRef<PagerView>(null);

    const goToPage = (index: number) => {
        setPage(index);
        pagerRef.current?.setPage(index);
    };

    return (
        <Fragment>
            <View className="w-full h-16 flex items-center justify-center px-2 pt-2">
                <Button className='w-full bg-gray-300 justify-start active:scale-1 active:bg-gray-400/70 active:border-gray-400' variant='bordered' size='lg' radius='full' >
                    <Search size={20} color="#555" />
                    <Text className='text-[16px] font-poppins-medium text-[#555] ml-1'>Search chat, Room...</Text>
                </Button>
            </View>
            <View className='w-full h-10 flex-row border-b border-default justify-start items-center'>
                <Button onPress={() => goToPage(0)} size='sm' variant='light' className='h-8'>
                    <View className='flex-row items-center gap-1'>
                        <MessageSquareText size={16} strokeWidth={2.3} color={page === 0 ? "#3b82f6" : "#6b7280"} />
                        <Text className={cn('text-base font-poppins-semibold', page === 0 ? "text-blue-500" : "text-gray-500")}>Chats</Text>
                    </View>
                </Button>
                <Button onPress={() => goToPage(1)} size='sm' variant='light' className='h-8'>
                    <View className='flex-row items-center gap-1'>
                        <MonitorPlay size={16} strokeWidth={2.3} color={page === 1 ? "#3b82f6" : "#6b7280"} />
                        <Text className={cn('text-base font-poppins-semibold', page === 1 ? "text-blue-500" : "text-gray-500")}>Rooms</Text>
                    </View>
                </Button>
            </View>
            <View style={{ flex: 1 }}>
                <PagerView
                    ref={pagerRef}
                    style={{ flex: 1 }}
                    initialPage={0}
                    pageMargin={0}
                    scrollEnabled={true}
                    onPageSelected={e => setPage(e.nativeEvent.position)}
                >
                    <View key="1" style={{ width }}>
                        <ChatWrapper />
                    </View>

                    <View key="2" style={{ width }}>
                        <RoomWrapper />
                    </View>
                </PagerView>
            </View>
            <AbsoluteButton icon={page === 0 ? <UserPlus color={"#ffffff"} /> :
                <View className='size-full absolute flex items-center justify-center'>
                    <Video color={"#ffffff"} />
                    <View className='absolute left-[20%]'>
                        <Plus color={"#ffffff"} strokeWidth={4} size={10} />
                    </View>
                </View>} />
        </Fragment>
    );
}