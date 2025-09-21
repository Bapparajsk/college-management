import { cn } from '@/utils/cn';
import { useRouter } from "expo-router";
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, Text } from 'react-native';

type BackButtonProps = {
    onPress?: () => void;
    title?: string;
    icon?: React.ReactNode;
    classNames?: {
        title?: string;
        container?: string;
    }
}

export default function BackButton({ onPress, title, icon, classNames }: BackButtonProps) {

    const router = useRouter();

    const clickHandler = () => {
        if (onPress) {
            onPress();
        } else {
            router.back();
        }
    }

    return (
        <Pressable className={cn('py-2 flex-row items-center', classNames?.container)} onPress={clickHandler}>
            {icon || <ChevronLeft size={24} stroke={"#374151"}/>}
            <Text className={cn('text-lg font-poppins-medium text-gray-700', classNames?.title)}>
                {title ? title : 'Back'}
            </Text>
        </Pressable>
    )
}