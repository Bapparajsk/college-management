import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

export default function FriendsCards() {
    return (
        <View className='w-full h-auto border-b border-default px-4 py-2 gap-1'>
            <View className='w-full flex-row justify-between items-center'>
                <Text className='text-lg font-poppins-semibold text-gray-950'>
                    Followers
                </Text>
                <Link href={"/"} className='text-base font-inter-medium text-blue-600'>
                    See all
                </Link>
            </View>
            <View className='w-full h-36 flex-row'>
                <Card name='John Doe' imageUrl='https://as2.ftcdn.net/v2/jpg/05/68/98/15/1000_F_568981524_2irG4VUSs06xbahAihTpkuSfxKkw8FqX.jpg' />
                <Card name='Jane Smith' imageUrl='https://thumbs.dreamstime.com/b/programmer-portrait-young-computer-technician-48752430.jpg' />
                <Card name='Bob Johnson' imageUrl='https://static.vecteezy.com/system/resources/previews/016/746/979/original/freelancer-software-developer-programmer-coder-illustrator-vector.jpg' />
            </View>
            <View className='w-full h-36 flex-row'>
                <Card name='Alice Williams' imageUrl='https://static.vecteezy.com/system/resources/previews/040/152/697/non_2x/male-programmer-working-on-desktop-computer-at-white-desk-in-office-photo.jpg' />
                <Card name='Charlie Brown' imageUrl='https://static.vecteezy.com/system/resources/previews/024/571/670/non_2x/side-view-of-young-female-programmer-working-on-computer-at-night-in-dark-office-a-female-programmer-coding-and-working-on-a-computer-in-her-office-ai-generated-free-photo.jpg' />
                <Card name='David Wilson' imageUrl='https://cdn.pixabay.com/photo/2024/01/16/10/50/computer-programmer-8511937_1280.jpg' />
            </View>
        </View>
    );
}


function Card({ imageUrl, name }: { imageUrl: string; name: string }) {
    return (
        <View className='w-1/3 h-full p-1'>
            <View
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,

                    elevation: 6,
                }}
                className='w-full h-full bg-gray-400 rounded-xl relative overflow-hidden'>
                <Image
                    source={{
                        uri: imageUrl
                    }}
                    className='w-full h-full object-cover'
                />
                <View className='absolute bottom-0 w-full h-5 bg-black bg-opacity-5 flex-row justify-start px-2'>
                    <Text numberOfLines={1} className='text-[10px] font-poppins-medium text-yellow-50'>
                        {name}
                    </Text>
                </View>
            </View>

        </View>
    )
}