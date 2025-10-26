import { cn } from '@/utils/cn';
import { Facebook, Github, Link, MapPin } from 'lucide-react-native';
import { Linking, Pressable, Text, View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function Header() {

    const openApp = async () => {
        await Linking.openURL("https://www.facebook.com/bapparaj.sk.796");
    };


    return (
        <View className='border-b border-default'>
            <View className="w-full h-44 flex-row items-center px-3">
                {/* Left - Avatar */}
                <View style={{
                    borderColor: '#1DA1F2',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 7,
                    },
                    shadowOpacity: 0.41,
                    shadowRadius: 9.11,

                    elevation: 14,
                }} className="size-32 mr-3 border-[3px] rounded-full overflow-hidden items-center justify-center">
                    <Avatar className='size-[7.5rem]' alt="Zach Nugent's Avatar">
                        <AvatarImage  source={{ uri: "https://img.freepik.com/premium-photo/portrait-successful-programmer-game-developer-coder-guy-uses-computer-laptop-work-game-design-hacker-boy-generative-ai-gamer-headphones_117038-5485.jpg" }} />
                        <AvatarFallback>
                            <Text>ZN</Text>
                        </AvatarFallback>
                    </Avatar>
                </View>

                {/* Right - Info */}
                <View className="flex-1 h-full justify-start gap-1">
                    <Text className="text-2xl font-poppins-semibold mt-3" numberOfLines={1}>
                        Bapparaj sk
                    </Text>
                    <Text
                        className="text-lg font-poppins-semibold text-gray-950"
                        numberOfLines={1}
                    >
                        C.S.T - <Text className='font-poppins-medium text-gray-600'>First Year</Text>
                    </Text>
                    <Text
                        className="text-base font-inter text-gray-600"
                        ellipsizeMode="tail"
                        numberOfLines={3}
                    >
                        Hay there! I&#39;m Bapparaj, a passionate developer and tech enthusiast.
                    </Text>
                </View>
            </View>
            <View className='h-auto w-full justify-center items-start px-3 pb-2 gap-1'>
                <PinDetails
                    icon={<MapPin size={18} />}
                    text="West Bengal/Murshidabad/Patikabari"
                    className='max-w-[80%] text-black'
                />
                <PinDetails
                    icon={<Facebook size={18} />}
                    text="bapparaj.sk.796"
                    onClick={openApp}
                />
                <PinDetails
                    icon={<Github size={18} />}
                    text="Bapparajsk"
                    onClick={openApp}
                />
                <PinDetails
                    icon={<Link size={18} />}
                    text="https://bapparaj.tech/"
                    onClick={openApp}
                />
            </View>
        </View>
    )
}

function PinDetails({ text, onClick, icon, className }: { text: string, onClick?: () => void, icon?: React.ReactNode, className?: string }) {
    return (
        <Pressable className='flex-row items-center justify-start gap-1' onPress={onClick}>
            {icon}
            <Text className={cn("text-base font-inter-semibold text-blue-500", className)}>{text}</Text>
        </Pressable>
    );
}

