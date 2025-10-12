import { BookMarked } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button } from '../ui/button';
import User from '../ui/user';

type HeaderTabsProps = {
    activeTab: "Posts" | "Saved";
    setActiveTab: (tab: "Posts" | "Saved") => void;
};

export default function HeaderTabs({ activeTab, setActiveTab }: HeaderTabsProps) {

    return (
        <View className="w-full h-20 flex-row items-center justify-between px-4 gap-2 border-b border-gray-300">
            <User />
            <Pressable
                className='border border-default flex-grow rounded-full h-12 justify-center px-3'
            >
                <Text className='font-poppins-semibold text-lg text-gray-800'>
                    Add Notes
                </Text>
            </Pressable>
            <Button radius='full' loading variant='danger'>
                <BookMarked color={"#000"} size={20}/>
            </Button>
        </View>
    );
}
