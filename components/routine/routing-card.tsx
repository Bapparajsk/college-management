import { decimalTo24h, formatHourTo12, formatTime } from '@/utils/format';
import { default as dayjs } from 'dayjs';
import { CalendarDays, ChevronDown, GraduationCap, NotebookText } from 'lucide-react-native';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
    Easing,
    FadeInDown,
    FadeOutUp,
    LinearTransition,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { RoutingDetails } from './routing-details';

const RoutingCard = ({ 
  subject, 
  classType, 
  time, 
  room, 
  teacher, 
  topics, 
  classTypeIcon: ClassTypeIcon, 
  icon: SubjectIcon, 
  color 
}: RoutingDetails) => {
    const [expanded, setExpanded] = useState(false);
    const [countdown, setCountdown] = useState("");

    const rotation = useSharedValue(0);
    const contentHeight = useSharedValue(0);
    const contentOpacity = useSharedValue(0);
    const borderOpacity = useSharedValue(0);

    const startTime = useMemo(() => decimalTo24h(time.start), [time.start]);
    const endTime = useMemo(() => decimalTo24h(time.end), [time.end]);

    const classStart = useMemo(() => dayjs().hour(startTime.hour).minute(startTime.minute).second(0), [startTime]);
    const classEnd = useMemo(() => dayjs().hour(endTime.hour).minute(endTime.minute).second(0), [endTime]);

    const { status, shouldShowCountdown } = useMemo(() => {
        const now = dayjs();
        if (now.isBefore(classStart)) {
            return { status: "Upcoming", shouldShowCountdown: true };
        } else if (now.isBefore(classEnd)) {
            return { status: "Ongoing", shouldShowCountdown: true };
        }
        return { status: "Completed", shouldShowCountdown: false };
    }, [classStart, classEnd]);

    // Calculate countdown only when needed
    useEffect(() => {
        if (!expanded || !shouldShowCountdown) {
            setCountdown("");
            return;
        }

        const calculateCountdown = () => {
            const now = dayjs();
            if (now.isBefore(classStart)) {
                return formatTime(classStart.diff(now, "second"));
            } else if (now.isBefore(classEnd)) {
                return formatTime(classEnd.diff(now, "second"));
            }
            return "00:00:00";
        };

        // Set initial value
        setCountdown(calculateCountdown());

        // Only set interval if expanded and countdown is needed
        const interval = setInterval(() => {
            setCountdown(calculateCountdown());
        }, 1000);

        return () => clearInterval(interval);
    }, [expanded, shouldShowCountdown, classStart, classEnd]);

    const toggleExpand = useCallback(() => {
        const newExpandedState = !expanded;
        
        // Update rotation with spring animation for smoother feel
        rotation.value = withSpring(newExpandedState ? 180 : 0, {
            damping: 50,
            stiffness: 300
        });
        
        // Animate content height and opacity
        if (newExpandedState) {
            contentHeight.value = withTiming(72, { 
                duration: 300,
                easing: Easing.out(Easing.cubic)
            });
            contentOpacity.value = withTiming(1, { duration: 200 });
            borderOpacity.value = withTiming(1, { duration: 200 });
        } else {
            contentHeight.value = withTiming(0, { 
                duration: 250,
                easing: Easing.in(Easing.cubic)
            });
            contentOpacity.value = withTiming(0, { duration: 150 });
            borderOpacity.value = withTiming(0, { duration: 150 });
        }
        
        // Update state after animation starts
        setTimeout(() => {
            setExpanded(newExpandedState);
        }, 10);
    }, [expanded, rotation, contentHeight, contentOpacity, borderOpacity]);

    const rotateStyleIcon = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const contentStyle = useAnimatedStyle(() => ({
        height: contentHeight.value,
        opacity: contentOpacity.value,
    }));

    const borderStyle = useAnimatedStyle(() => ({
        borderTopColor: `rgba(229, 231, 235, ${borderOpacity.value})`,
    }));

    return (
        <Animated.View
            layout={LinearTransition.duration(200).easing(Easing.out(Easing.quad))}
            entering={FadeInDown.duration(200).easing(Easing.out(Easing.quad))}
            exiting={FadeOutUp.duration(200).easing(Easing.out(Easing.quad))}
            style={[{ borderWidth: 1, borderColor: "#E5E7EB", backgroundColor: "#FFFFFF", borderRadius: 12, overflow: "hidden" }]}
        >
            <Pressable onPress={toggleExpand} android_ripple={{ color: '#00000010' }}>
                <View className="w-full h-20 flex flex-row items-center justify-between px-3">
                    <View className="flex flex-row items-center gap-2">
                        <View style={{ backgroundColor: color + "30", borderColor: color + "60" }} className={("size-14 rounded-full border-2 flex items-center justify-center")}>
                            <SubjectIcon color={color} />
                        </View>
                        <View>
                            <Text className="text-lg font-poppins-semibold max-w-[270px]" numberOfLines={1}>
                                {subject}
                                <Text className="text-base font-poppins-regular text-gray-700">
                                    {" "} {teacher?.sortForm && `(${teacher.sortForm})`} {room && `- (${room})`}
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
                
                {expanded && (
                    <Animated.View 
                        className="px-3 border-t h-0" 
                        style={[contentStyle, borderStyle, { overflow: "hidden" }]}
                    >
                        <View className="py-2">
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
                        </View>
                    </Animated.View>
                )}
            </Pressable>
        </Animated.View>
    )
}

const MemoizedRoutingCard = memo(RoutingCard);
export default MemoizedRoutingCard;