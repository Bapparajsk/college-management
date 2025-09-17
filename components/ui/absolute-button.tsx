import { cn } from '@/utils/cn';
import { Link } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type AbsoluteButtonProps = {
    onPress?: () => void;
    icon?: React.ReactNode;
    className?: string;
}

export default function AbsoluteButton({ onPress, icon, className }: AbsoluteButtonProps) {

    const insets = useSafeAreaInsets();

    return (
        <Pressable onPress={onPress} style={{ bottom: insets.bottom + 90 }}
            className={cn("absolute right-5 z-10 size-16 rounded-3xl bg-[#0D1017] flex items-center justify-center", className)}>
            <Link href="/new-post" asChild push>
                {icon || <Plus color={"#FFFFFF"} />}
            </Link>
        </Pressable>
    )
}