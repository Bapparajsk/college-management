import { BookMarked } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../ui/button';
import User from '../ui/user';


export default function HeaderTabs() {

    return (
        <View className="w-full h-20 flex-row items-center justify-between px-4 gap-2 border-b border-gray-300">
            <User />
            <Button href='/new-post' variant='bordered' radius='lg' className='flex-1 justify-start px-2' >
                <Text className='font-poppins-medium text-lg text-gray-600'>
                    Add Note...
                </Text>
            </Button>
            <Button href='/new-post' radius='lg' variant='flat' boxShadow='lg' color='primary'>
                <BookMarked color={"#000"} size={18} />
            </Button>
        </View>
    );
}
