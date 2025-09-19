import { Link } from 'expo-router';
import { Bell, Cog, MessagesSquare } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

type HeaderProps = {
    icon: React.ReactNode;
    title: string | React.ReactNode;
}

export default function Header({ icon, title }: HeaderProps) {
    return (
        <View className="h-16 border-b border-b-default p-2">
            <View className="w-full h-full flex flex-row items-center justify-between">
                <View className="flex flex-row gap-2 items-center">
                    {icon}
                    {typeof title === 'string' ? (
                        <Text className="text-xl font-poppins-semibold">{title}</Text>
                    ) : (
                        title
                    )}
                </View>
                <View className="flex flex-row items-center">
                    <Pressable className="p-2 rounded-full bg-default/10">
                        <Link href="/profile" asChild push>
                            <Bell size={23} color={"#374151"} />
                        </Link>
                    </Pressable>
                    <Pressable className="p-2 rounded-full bg-default/10">
                        <Link href="/profile" asChild push>
                            <MessagesSquare size={23} color={"#374151"} />
                        </Link>
                    </Pressable>
                    <Pressable className="p-2 rounded-full bg-default/10">
                        <Link href="/profile" asChild push>
                            <Cog size={25} color={"#007AFF"} />
                        </Link>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
