import { MessagesSquare, Search, Video } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import AbsoluteButton from '../ui/absolute-button';
import Header from '../ui/header';
import Input from '../ui/input';

export default function Wrapper() {
    return (
        <>
            <Header icon={<MessagesSquare size={24} />} title="Chats" />
            <View className="w-full h-20 flex items-center justify-center px-2">
                <Input
                    startContent={<Search size={20} color="#555" />}
                    placeholder='Search chat...'
                />
            </View>
            <AbsoluteButton icon={<Video color={"#ffffff"} />} />
        </>
    );
}