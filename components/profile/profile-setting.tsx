import { LinearGradient } from 'expo-linear-gradient';
import { Building2, ChevronRight, DoorClosedLocked, IdCard, Link, Shield, Signature, TextInitial, UserRoundCog, UserRoundPen } from 'lucide-react-native';
import { ReactNode, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import AbsoluteButton from '../ui/absolute-button';
import BackButton from '../ui/back';

export default function ProfileSetting() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <AbsoluteButton
                icon={<UserRoundCog color={"#ffffff"} />}
                onPress={() => setModalVisible(true)}
            />
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // for Android back button
            >
                <View className="bg-white flex-1">
                    <LinearGradient
                        colors={['#d0e8ff', '#cae9ff', '#c3eafd', '#bdeafb', '#b8ebf8', '#b2eaf6', '#ace9f3', '#a6e8f0', '#9de6ee', '#94e3ed', '#8ae1eb', '#80deea']}
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={{
                            flex: 1,
                        }}
                    >
                        <View className='w-full h-16 flex-row items-center px-4 justify-center border-b border-gray-600 relative'>
                            <View className='absolute left-2'>
                                <BackButton
                                    onPress={() => setModalVisible(false)}
                                    title='Profile'
                                    // color='#3b82f6'
                                    classNames={{ title: 'text-xl' }}
                                />
                            </View>
                            <Text className='text-lg font-poppins-semibold'>
                                Settings
                            </Text>
                        </View>
                        <ScrollView>
                            <View className='w-full h-auto px-6 py-4 items-center justify-center'>
                                <Text className='text-2xl font-poppins-semibold text-gray-800 mb-2'>
                                    Accounts Center
                                </Text>
                                <Text className='font-inter-semibold text-gray-700 text-center'>
                                    Control settings for connected experiences across your apps, including story and post sharing and logging in.
                                </Text>
                            </View>
                            <View className='w-full px-6 gap-2 mt-4'>
                                <View className='flex-row gap-1'>
                                    <UserRoundPen size={20} />
                                    <Text className='text-xl font-poppins-semibold text-gray-800'>
                                        Profile Manager
                                    </Text>
                                </View>
                                <View className='w-full h-auto py-2 rounded-xl border border-gray-600'>
                                    <SessionButton title='Name' icon={<Signature size={20} />} />
                                    <SessionButton title='Department' icon={<Building2 size={20} />} />
                                    <SessionButton title='Bio' icon={<TextInitial size={20} />} />
                                    <SessionButton title='Links' icon={<Link size={20} />} />
                                </View>
                            </View>
                            <View className='w-full px-6 gap-2 mt-7'>
                                <View className='flex-row gap-1'>
                                    <UserRoundCog size={20} />
                                    <Text className='text-xl font-poppins-semibold text-gray-800'>
                                        Account Settings
                                    </Text>
                                </View>
                                <View className='w-full h-auto py-2 rounded-xl border border-gray-600'>
                                    <SessionButton title='Password & Security' icon={<Shield size={20} />} />
                                    <SessionButton title='Personal Information' icon={<IdCard size={20} />} />
                                    <SessionButton title='Information & Permissions' icon={<DoorClosedLocked size={20} />} />
                                </View>
                            </View>
                        </ScrollView>
                    </LinearGradient>
                </View>
            </Modal>
        </>
    );
}

function SessionButton({ icon, title, onPress }: { icon?: ReactNode; title?: string; onPress?: () => void }) {
    return (
        <Pressable onPress={onPress} className='w-full h-14 px-4 flex-row items-center justify-between'>
            <View className='flex-row gap-1 items-center'>
                {icon}
                <Text className='text-lg font-poppins-semibold text-gray-800'>
                    {title}
                </Text>
            </View>
            <ChevronRight size={18} />
        </Pressable>
    );
}
