import BackButton from '@/components/ui/back';
import Textarea from '@/components/ui/textarea';
import User from '@/components/ui/user';
import { Hash, ImagePlus, Smile } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View className='w-full h-auto py-4'>
                <View className='w-full h-12 flex-row items-center justify-between px-4'>
                    <BackButton />
                    <Text className='text-lg font-poppins-semibold text-black'>
                        Create Post
                    </Text>
                    <Pressable className='px-4 py-2 flex-row items-center rounded-2xl bg-blue-500/20'>
                        <Text className='text-xl font-poppins-semibold text-blue-600'>Post</Text>
                    </Pressable>
                </View>
                <View className='w-full h-auto min-h-80 p-3'>
                    <View className='w-full min-auto border border-default rounded-xl p-3'>
                        <User />
                        <View className='px-2 mt-2 w-full h-62'>
                            <Textarea
                                placeholder="Type your notes..."
                                maxLength={150}
                                // onChangeText={(t) => console.log("Text:", t)}
                            />
                        </View>
                        <View className='w-full flex-row gap-1'>
                            <Pressable onPress={() => setModalVisible(true)} className='p-2 rounded-full border border-default flex-row gap-1 items-center'>
                                <ImagePlus size={18} stroke={"#00000090"} />
                            </Pressable>
                            <Pressable className='p-2 rounded-full border border-default flex-row gap-1 items-center'>
                                <Smile size={18} stroke={"#00000090"} />
                            </Pressable>
                            <Pressable className='p-2 rounded-full border border-default flex-row gap-1 items-center'>
                                <Hash size={18} stroke={"#00000090"} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    onPress={() => setModalVisible(false)}
                    className="flex-1 items-center justify-center"
                >
                    {/* Stop closing when pressing inside the modal box */}
                    <Pressable
                        onPress={(e) => e.stopPropagation()}
                        className="w-4/5 p-6 bg-white rounded-2xl shadow-lg"
                    >
                        <Text className="text-lg font-semibold mb-4">This is a Modal 🎉</Text>
                        <Text className="mb-6">You can manage state to open/close it.</Text>

                        {/* Close Button */}
                        <Pressable
                            onPress={() => setModalVisible(false)}
                            className="bg-red-500 px-4 py-2 rounded-lg"
                        >
                            <Text className="text-white">Close</Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>


        </SafeAreaView>
    )
}
