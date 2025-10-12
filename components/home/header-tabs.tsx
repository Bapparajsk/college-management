import { BookMarked } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../ui/button';
import User from '../ui/user';

type HeaderTabsProps = {
    activeTab: "Posts" | "Saved";
    setActiveTab: (tab: "Posts" | "Saved") => void;
};

export default function HeaderTabs({ setActiveTab }: HeaderTabsProps) {

    return (
        <View className="w-full h-20 flex-row items-center justify-between px-4 gap-2 border-b border-gray-300">
            <User />
            <Button radius='lg' className='flex-1 justify-start px-2' >
                <Text className='font-poppins-medium text-lg text-gray-700'>
                    Add Notes...
                </Text>
            </Button>
            <Button radius='lg' variant='bordered' color='danger' onPress={() => setActiveTab("Saved")}>
                <BookMarked color={"#000"} size={18} />
            </Button>
        </View>
    );
}
