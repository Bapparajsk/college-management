import React from "react";
import { GestureResponderEvent, Image, Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type Avatar = {
    id: string | number;
    uri?: string;
    initials?: string;
};

export type RoomCardProps = {
    id?: string | number;
    title: string;
    description?: string;
    participants?: number;
    avatars?: Avatar[];
    isLive?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
    onJoin?: (event: GestureResponderEvent) => void;
};

export default function RoomCard({
    title,
    description,
    participants = 0,
    avatars = [],
    isLive = false,
    onPress,
    onJoin,
}: RoomCardProps) {
    const visibleAvatars = avatars.slice(0, 3);
    const remaining = Math.max(0, avatars.length - visibleAvatars.length);

    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withSpring(scale.value) }],
    }));

    return (
        <Animated.View style={[animatedStyle, { marginBottom: 5 }]}>
            <Pressable
                onPressIn={() => (scale.value = 0.97)}
                onPressOut={() => (scale.value = 1)}
                onPress={onPress}
                className="bg-white rounded-2xl p-4 flex-row items-center shadow-md border border-gray-100"
                style={{
                    shadowColor: "#000",
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                    elevation: 3,
                }}
            >
                {/* Thumbnail with LIVE tag */}
                <View className="w-16 h-16 rounded-2xl overflow-hidden mr-4 bg-gray-200/80 justify-center items-center relative">
                    <Text className="text-[10px] text-gray-600 font-inter-medium">ROOM</Text>
                    {isLive && (
                        <View className="absolute top-1 left-2 bg-red-500 flex-row items-center px-2 py-[2px] rounded-full">
                            <View className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                            <Text className="text-[10px] text-white font-inter-semibold">LIVE</Text>
                        </View>
                    )}
                </View>

                {/* Content */}
                <View className="flex-1">
                    <Text className="text-gray-900 text-base font-poppins-semibold">{title}</Text>
                    {description ? (
                        <Text className="text-gray-500 font-inter-medium text-[13px] mt-1" numberOfLines={2}>
                            {description}
                        </Text>
                    ) : (
                        <Text className="text-gray-400 text-[13px] mt-1">
                            {participants} participants
                        </Text>
                    )}

                    {/* Avatars + Join Button */}
                    <View className="flex-row items-center mt-3">
                        <View className="flex-row -space-x-3">
                            {visibleAvatars.map((a) => (
                                <View
                                    key={a.id}
                                    className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-gray-300 justify-center items-center"
                                >
                                    {a.uri ? (
                                        <Image source={{ uri: a.uri }} className="w-full h-full" />
                                    ) : (
                                        <Text className="text-[11px] text-gray-700 font-inter-medium">
                                            {a.initials ?? "U"}
                                        </Text>
                                    )}
                                </View>
                            ))}

                            {remaining > 0 && (
                                <View className="w-9 h-9 rounded-full border-2 border-white bg-gray-200 justify-center items-center">
                                    <Text className="text-[11px] text-gray-600 font-inter-semibold">
                                        +{remaining}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Join Button */}
                        <Pressable
                            onPress={onJoin}
                            className="ml-4 px-4 py-[6px] rounded-full bg-blue-500 active:opacity-80"
                            style={{
                                shadowColor: "#3b82f6",
                                shadowOpacity: 0.25,
                                shadowRadius: 3,
                                elevation: 2,
                            }}
                        >
                            <Text className="text-sm text-white font-medium font-poppins-medium">Join</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Animated.View>
    );
}
