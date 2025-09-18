import { formatNumber } from '@/utils/format';
import { Image, Text, View } from 'react-native';

export default function Header() {
    return (
        <View className='border-b border-default px-4'>
            <View className="w-full h-44 flex-row items-center px-2">
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
                    <Image
                        source={{
                            uri: "https://img.freepik.com/premium-photo/portrait-successful-programmer-game-developer-coder-guy-uses-computer-laptop-work-game-design-hacker-boy-generative-ai-gamer-headphones_117038-5485.jpg",
                        }}
                        className="size-[7.5rem] rounded-full object-cover border border-default"
                    />
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
            <View className="flex-row justify-center border-t border-default py-2 items-center">
                <FollowersContainer title='Followers' value='5976400' />
                <View className="w-1.5 h-9 rounded-full bg-gray-500 mx-6" />
                <FollowersContainer title='Following' value='150' />
                <View className="w-1.5 h-9 rounded-full bg-gray-500 mx-6" />
                <FollowersContainer title='Posts' value='75' />
            </View>
        </View>
    )
}

function FollowersContainer({ title, value }: { title: string; value: string }) {
    return (
        <View className='items-center'>
            <Text className="text-lg font-poppins-semibold text-gray-950">{formatNumber(value)}</Text>
            <Text className="text-lg font-inter-medium text-gray-600">{title}</Text>
        </View>
    );
}