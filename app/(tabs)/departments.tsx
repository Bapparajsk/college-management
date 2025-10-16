import Header from "@/components/ui/header";
import Input from "@/components/ui/input";
import { GraduationCap, Grip, Search } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Department() {
    return (
        <SafeAreaView
            style={{ flex: 1 }}
        >
            <Header icon={<GraduationCap size={29} />} title="Faculty" />
            <View className="w-full h-20 flex items-center justify-center px-3">
                <Input
                    startContent={<Search size={20} color="#555" />}
                    placeholder="Search Faculty..."
                />
            </View>
            <View className="flex-1">
                <View className="w-full h-20 px-4 flex flex-row items-center justify-between bg-white border-b border-default">
                    <View className="flex-row items-center gap-x-3">
                        <View className="size-16 rounded-full overflow-hidden border border-default" >
                            <Image
                                source={{ uri: 'https://tse1.explicit.bing.net/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?rs=1&pid=ImgDetMain&o=7&rm=3' }}
                                className="w-full h-full object-cover"
                            />
                        </View>
                        <View>
                            <Text className="text-[15px] font-inter-semibold">John Doe</Text>
                            <Text className="text-[12px] text-gray-500 font-inter">Professor of Computer Science</Text>
                        </View>
                    </View>
                    <Pressable className="mr-3">
                        <Grip size={20} color={"#555"}/>
                    </Pressable>
                </View>
                <View className="w-full h-20 px-4 flex flex-row items-center justify-between bg-white border-b border-default">
                    <View className="flex-row items-center gap-x-3">
                        <View className="size-16 rounded-full overflow-hidden border border-default" >
                            <Image
                                source={{ uri: 'https://tse1.explicit.bing.net/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?rs=1&pid=ImgDetMain&o=7&rm=3' }}
                                className="w-full h-full object-cover"
                            />
                        </View>
                        <View>
                            <Text className="text-[15px] font-inter-semibold">John Doe</Text>
                            <Text className="text-[12px] text-gray-500 font-inter">Professor of Computer Science</Text>
                        </View>
                    </View>
                    <Pressable className="mr-3">
                        <Grip size={20} color={"#555"}/>
                    </Pressable>
                </View>
                <View className="w-full h-20 px-4 flex flex-row items-center justify-between bg-white border-b border-default">
                    <View className="flex-row items-center gap-x-3">
                        <View className="size-16 rounded-full overflow-hidden border border-default" >
                            <Image
                                source={{ uri: 'https://tse1.explicit.bing.net/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?rs=1&pid=ImgDetMain&o=7&rm=3' }}
                                className="w-full h-full object-cover"
                            />
                        </View>
                        <View>
                            <Text className="text-[15px] font-inter-semibold">John Doe</Text>
                            <Text className="text-[12px] text-gray-500 font-inter">Professor of Computer Science</Text>
                        </View>
                    </View>
                    <Pressable className="mr-3">
                        <Grip size={20} color={"#555"}/>
                    </Pressable>
                </View>
                <View className="w-full h-20 px-4 flex flex-row items-center justify-between bg-white border-b border-default">
                    <View className="flex-row items-center gap-x-3">
                        <View className="size-16 rounded-full overflow-hidden border border-default" >
                            <Image
                                source={{ uri: 'https://tse1.explicit.bing.net/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?rs=1&pid=ImgDetMain&o=7&rm=3' }}
                                className="w-full h-full object-cover"
                            />
                        </View>
                        <View>
                            <Text className="text-[15px] font-inter-semibold">John Doe</Text>
                            <Text className="text-[12px] text-gray-500 font-inter">Professor of Computer Science</Text>
                        </View>
                    </View>
                    <Pressable className="mr-3">
                        <Grip size={20} color={"#555"}/>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}
