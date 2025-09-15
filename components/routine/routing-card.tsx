import { decimalTo24h, formatHourTo12, formatTime } from '@/utils/format';
import { default as dayjs } from 'dayjs';
import { CalendarDays, ChevronDown, GraduationCap, NotebookText } from 'lucide-react-native';
import { memo, useEffect, useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { Easing, FadeInDown, FadeOutUp, LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { RoutingDetails } from './routing-details';


const RoutingCard = ({ subject, classType, time, room, teacher, topics, classTypeIcon: ClassTypeIcon, icon: SubjectIcon, color }: RoutingDetails) => {
    const [now, setNow] = useState(dayjs());

    const rotation = useSharedValue(0);
    const expanded = useSharedValue(false);

    const startTime = useMemo(() => decimalTo24h(time.start), [time.start]);
    const endTime = useMemo(() => decimalTo24h(time.end), [time.end]);

    const classStart = useMemo(() => dayjs().hour(startTime.hour).minute(startTime.minute).second(0), [startTime]);
    const classEnd = useMemo(() => dayjs().hour(endTime.hour).minute(endTime.minute).second(0), [endTime]);

    const toggleExpand = () => {
        expanded.value = !expanded.value;
        rotation.value = withTiming(expanded.value ? 0 : 180, { duration: 400 });
    };

    const rotateStyleIcon = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const contentStyle = useAnimatedStyle(() => ({
        height: expanded.value ? withTiming(72, { duration: 200 }) : withTiming(0, { duration: 200 }),
        // opacity: withTiming(expanded.value ? 1 : 0, { duration: 200 }),
        paddingVertical: expanded.value ? withTiming(8, { duration: 200 }) : withTiming(0, { duration: 200 }),
        borderColor: expanded.value ? "#bdbdc2" : "transparent"
    }));

    // 🔹 Track countdown only when expanded + not Completed
    useEffect(() => {
        let interval: number | null = null;

        // Check if we should start ticking
        const isActive = expanded.value && !now.isAfter(classEnd);

        if (isActive) {
            interval = setInterval(() => {
                setNow(dayjs());
            }, 1000); // tick every second when expanded
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [expanded.value, now, classEnd]);


    const { status, countdown } = useMemo(() => {
        if (now.isBefore(classStart)) {
            return { status: "Upcoming", countdown: formatTime(classStart.diff(now, "second")) };
        } else if (now.isBefore(classEnd)) {
            return { status: "Ongoing", countdown: formatTime(classEnd.diff(now, "second")) };
        }
        return { status: "Completed", countdown: "00:00:00" };
    }, [now, classStart, classEnd]);

    return (
        <Animated.View
            layout={LinearTransition.duration(150).easing(Easing.linear)} // linear expand/collapse
            entering={FadeInDown.duration(150).easing(Easing.linear)}
            exiting={FadeOutUp.duration(150).easing(Easing.linear)}

            style={[{ borderWidth: 1, borderColor: "#E5E7EB", backgroundColor: "#FFFFFF", borderRadius: 12, overflow: "hidden", }]}
        >
            <Pressable onPress={toggleExpand}>
                <View className="w-full h-20 flex flex-row items-center justify-between px-3">
                    <View className="flex flex-row items-center gap-2">
                        <View style={{ backgroundColor: color + "40" }} className="size-14 rounded-full border border-default flex items-center justify-center">
                            <SubjectIcon color={color} />
                        </View>
                        <View>
                            <Text className="text-lg font-poppins-semibold max-w-[270px]" numberOfLines={1}>
                                {subject}
                                <Text className="text-base font-poppins-regular text-gray-700">
                                    {" "} {teacher?.sortForm && `(${teacher.sortForm}) - `} {room && `(${room})`}
                                </Text>
                            </Text>
                            <Text className="text-base font-poppins text-gray-600">
                                {formatHourTo12(time.start)} - {formatHourTo12(time.end)}
                            </Text>
                        </View>
                    </View>
                    <View className="p-2">
                        <Animated.View style={rotateStyleIcon}>
                            <ChevronDown color="#6B7280" />
                        </Animated.View>
                    </View>
                </View>
                {(<Animated.View className="px-3 border-t border-transparent h-0" style={[contentStyle, { overflow: "hidden" }]}>  
                    <View className="flex-row justify-between items-center mb-1">
                        <Text className="text-sm font-poppins text-gray-600">
                            {status === "Upcoming" && "Starts in:"}
                            {status === "Ongoing" && "Ends in:"}
                            {status === "Completed" && "Class finished"}
                            {status !== "Completed" && (
                                <Text className="font-poppins-semibold text-green-500"> {countdown}</Text>
                            )}
                        </Text>
                        <Text
                            className={`text-xs font-poppins-semibold px-2 py-0.5 rounded-full ${status === "Upcoming"
                                ? "bg-yellow-100 text-yellow-700"
                                : status === "Ongoing"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                        >
                            {status}
                        </Text>
                    </View>

                    <View className="flex-row flex-wrap justify-between">
                        {/* Room */}
                        <View className="flex-row items-center w-[48%] mb-1">
                            <CalendarDays size={14} color="#6B7280" />
                            <Text className="ml-1 text-xs font-poppins text-gray-600">Room {room || <Text className="text-gray-400">N/A</Text>}</Text>
                        </View>

                        {/* Teacher */}
                        <View className="flex-row items-center w-[48%] mb-1">
                            <GraduationCap size={14} color="#007AFF" />
                            <Text className="ml-1 text-xs font-poppins text-gray-600">{teacher?.fullName || <Text className="text-gray-400">N/A</Text>}</Text>
                        </View>

                        {/* Class Type */}
                        <View className="flex-row items-center w-[48%] mb-1">
                            <ClassTypeIcon size={14} color="#6B7280" />
                            <Text className="ml-1 text-xs font-poppins text-gray-600">{classType}</Text>
                        </View>

                        {/* Topics */}
                        <View className="flex-row items-center w-[48%] mb-1">
                            <NotebookText size={14} color="#6B7280" />
                            <Text className="ml-1 text-xs font-poppins text-gray-600">{topics || <Text className="text-gray-400">No topics assigned</Text>}</Text>
                        </View>
                    </View>
                </Animated.View>)}
            </Pressable>
        </Animated.View>
    )
}

const MemoizedRoutingCard = memo(RoutingCard);
export default MemoizedRoutingCard;