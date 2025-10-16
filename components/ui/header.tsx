import { Link, usePathname } from 'expo-router';
import { Bell, Cog } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import If from './if';

type HeaderProps = {
    icon?: React.ReactNode;
    title?: string | React.ReactNode;
    current?: "notification" | "setting" | null;
}

const links: {
    href: "/notification"  | "/setting";
    icon: React.ReactNode;
    name: "notification" | "setting";
}[] = [
        {
            href: "/notification",
            icon: <Bell size={23} color={"#374151"} />,
            name: "notification"
        },
        {
            href: "/setting",
            icon: <Cog size={25} color={"#007AFF"} />,
            name: "setting"
        }
    ]

export default function Header({ icon, title, current }: HeaderProps) {

    const pathName = usePathname();

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
                    {links.map(({ href, icon, name }) => (
                        <If
                            key={name}
                            condition={current !== name}
                            IfComponent={
                                <Pressable key={name} className="p-2 rounded-full bg-default/10">
                                    <Link href={{ pathname: href, params: { prevPath: pathName } }} asChild push>
                                        {icon}
                                    </Link>
                                </Pressable>
                            }
                        />
                    ))}
                </View>
            </View>
        </View>
    )
}
