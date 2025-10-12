import React from 'react';
import { Image, Text, View } from 'react-native';
import {cn} from "@/utils/cn";


type UserProps = {
    name?: string;
    department?: string;
    year?: string;
    size?: "sm" | "md" | "lg";
}

export default function User({ name, department, year, size }: UserProps) {

    const sizes = {
        sm: 48,
        md: 64,
        lg: 80,
    };

    return (
        <View className={cn("h-16 w-auto flex-row items-center", name || department || year ? "gap-2" : "")}>
            <View style={{ width: sizes[size || "sm"], height: sizes[size || "sm"] }} className="rounded-full overflow-hidden">
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
                    {name}
                </Text>
                <Text
                    className="text-sm font-poppins-semibold text-gray-950 max-w-64"
                    numberOfLines={1}
                >
                    {department && `${department} -`} <Text className='font-poppins-medium text-gray-600'>{year}</Text>
                </Text>
            </View>
        </View>
    )
}
