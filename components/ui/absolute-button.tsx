import { cn } from '@/utils/cn';
import { Plus } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type AbsoluteButtonProps = {
    onPress?: () => void;
    icon?: React.ReactNode;
    className?: string;
}

export default function AbsoluteButton({ onPress, icon, className }: AbsoluteButtonProps) {

    const insets = useSafeAreaInsets();

    return (
        <Pressable onPress={onPress} style={{
            bottom: insets.bottom + 90, shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,

            elevation: 14,
        }}
            className={cn("absolute right-5 z-10 size-16 rounded-3xl bg-[#0D1017] flex items-center justify-center", className)}>
            <View >
                {icon || <Plus color={"#FFFFFF"} />}
            </View>
        </Pressable>
    )
}