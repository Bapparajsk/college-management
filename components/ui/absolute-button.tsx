import { cn } from '@/utils/cn';
import { useRouter } from "expo-router";
import { Plus } from 'lucide-react-native';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, ButtonProps } from './button';

type AbsoluteButtonProps = ButtonProps & {
    onPress?: () => void;
    icon?: React.ReactNode;
    className?: string;
    href?: string;
}

export default function AbsoluteButton({ onPress, icon, className, href, ...props }: AbsoluteButtonProps) {

    const insets = useSafeAreaInsets();
    const router = useRouter();

    const handlePress = () => {
        if (href) {
            router.push(href as any);
        } else if (onPress) {
            onPress();
        }
    }

    return (
        <Button
            onPress={handlePress}
            style={{
                bottom: insets.bottom + 90,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
            }}
            variant='flat'
            radius='lg'
            className={cn("absolute right-5 z-10 size-16 bg-[#0D1017]", className)}
            {...props}
        >
            <Text >
                {icon || <Plus color={"#FFFFFF"} />}
            </Text>
        </Button>
    )
}