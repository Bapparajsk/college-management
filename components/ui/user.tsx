import React from 'react'
import { Image, Text, View } from 'react-native'

export default function User() {
    return (
        <View className="h-16 w-auto flex-row gap-2 items-center">
            <View className="w-16 h-full rounded-full overflow-hidden">
                <Image
                    source={{
                        uri: "https://img.freepik.com/premium-photo/portrait-successful-programmer-game-developer-coder-guy-uses-computer-laptop-work-game-design-hacker-boy-generative-ai-gamer-headphones_117038-5485.jpg",
                    }}
                    className="size-full rounded-full object-cover"
                />
            </View>
            <View className="h-full justify-center gap-1">
                <Text
                    className="text-lg font-poppins-semibold max-w-64"
                    numberOfLines={1}
                >
                    Bapparaj sk
                </Text>
                <Text
                    className="text-sm font-poppins-semibold text-gray-950 min-w-64"
                    numberOfLines={1}
                >
                    C.S.T - <Text className='font-poppins-medium text-gray-600'>First Year</Text>
                </Text>
            </View>
        </View>
    )
}