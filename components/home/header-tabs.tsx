import { BookMarked, List } from 'lucide-react-native';
import React, { useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

export default function HeaderTabs({ activeTab, setActiveTab }: { activeTab: "Posts" | "Saved"; setActiveTab: React.Dispatch<React.SetStateAction<"Posts" | "Saved">>; }) {
    const translateX = useSharedValue(0);
    const indicatorWidth = useSharedValue(0);
    

    const setTabIndicator = (width: number, left: number) => {
        indicatorWidth.value = withSpring(width, {
            damping: 40,
            stiffness: 320,
        });
        translateX.value = withSpring(left, {
            damping: 40,
            stiffness: 320,
        });
    };

    const indicatorStyle = useAnimatedStyle(() => ({
        width: indicatorWidth.value,
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View className="relative w-full h-14 flex-row items-center gap-4 px-4 border-b border-gray-300">
            <TabButtons
                title="Posts"
                icon={<List size={18} stroke={activeTab === 'Posts' ? '#3b82f6' : 'black'} />}
                setTabIndicator={setTabIndicator}
                active={activeTab === 'Posts'}
                setActiveTab={setActiveTab}
                isDefault={true} // 👈 default active tab
            />
            <TabButtons
                title="Saved"
                icon={<BookMarked size={18} stroke={activeTab === 'Saved' ? '#3b82f6' : 'black'} />}
                setTabIndicator={setTabIndicator}
                active={activeTab === 'Saved'}
                setActiveTab={setActiveTab}
            />

            <Animated.View
                style={indicatorStyle}
                className="absolute bottom-2 left-0 h-1 bg-blue-500 rounded-full"
            />
        </View>
    );
}

function TabButtons({
    title,
    icon,
    setTabIndicator,
    active,
    setActiveTab,
    isDefault = false
}: {
    title: "Posts" | "Saved";
    icon?: React.ReactNode;
    setTabIndicator: (width: number, left: number) => void;
    active: boolean;
    setActiveTab: React.Dispatch<React.SetStateAction<"Posts" | "Saved">>;
    isDefault?: boolean;
}) {
    const ref = useRef<View | null>(null);

    // set indicator only once on mount if default
    const handleLayout = () => {
        if (!isDefault || !ref.current) return;
        ref.current.measure((x, y, width, height, pageX, pageY) => {
            setTabIndicator(width, pageX);
        });
    };

    // always update on press
    const handlePress = () => {
        if (!ref.current) return;
        ref.current.measure((x, y, width, height, pageX, pageY) => {
            setTabIndicator(width, pageX);
            setActiveTab(title);
        });
    };

    return (
        <Pressable
            ref={ref}
            onPress={handlePress}
            onLayout={handleLayout}
            className="px-1 py-2 flex-row items-center gap-2"
        >
            {icon}
            <Text
                className={`text-lg font-poppins-semibold ${active ? 'text-blue-500' : 'text-black'
                    }`}
            >
                {title}
            </Text>
        </Pressable>
    );
}
