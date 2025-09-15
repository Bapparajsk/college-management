import { Link } from "expo-router";
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const screenWidth = Dimensions.get("window").width;

const NoticeCard = () => {
    const [imageHeight, setImageHeight] = useState<number | null>(null);
    const image = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80"; // Example image URL
    useEffect(() => {
        Image.getSize(
            image,
            (width, height) => {
                const ratio = height / width;
                setImageHeight(screenWidth * ratio);
            },
            () => setImageHeight(screenWidth) // fallback: square
        );
    }, [image]);


    return (
        <View className="bg-white mb-1 py-2">
            {/* Top: Avatar + Username */}
            <View className="flex-row items-center justify-start px-3 gap-3">
                <Image source={{ uri: "https://i.pravatar.cc/150?img=3" }} className="size-12 rounded-full" />
                <View className="flex flex-col">
                    <Text className="font-poppins-semibold text-[13px]">
                        John Doe
                    </Text>
                    <Text className="font-poppins-light text-[10px]">
                        2 hours ago
                    </Text>
                </View>
            </View>

            {/* Post Image */}
            <Image
                source={{ uri: image }}
                className="w-full mt-3"
                style={{ width: screenWidth, height: imageHeight }}
                resizeMode="cover"
            />

            {/* Actions */}
            <View className="flex-row gap-4 px-3 mt-3">
                <TouchableOpacity>
                    <Text className="text-[20px]">❤️</Text>
                </TouchableOpacity>
                <Link href={"/"} asChild>
                    <TouchableOpacity>
                        <Text className="text-[20px]">💬</Text>
                    </TouchableOpacity>
                </Link>
            </View>
            
            {/* Caption */}
            <View className="px-3 mt-1">
                <Text className="font-poppins-semibold"> 94759 Likes </Text>
                <Text className='max-w-[85%] text-base font-inter-light'>
                    This is a sample caption for the post. It can be multiple lines long and contain various information about the post.
                </Text>
            </View>
        </View>
    );
};

export default NoticeCard;