import { decimalTo24h, formatHourTo12, formatTime } from '@/utils/format';
import { default as dayjs } from 'dayjs';
import { CalendarDays, GraduationCap, NotebookText } from 'lucide-react-native';
import { memo, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, {
    Easing,
    FadeInDown,
    FadeOutUp,
    LinearTransition
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
    color,
}: RoutingDetails) => {
    const [countdown, setCountdown] = useState("");

    const startTime = useMemo(() => decimalTo24h(time.start), [time.start]);
    const endTime = useMemo(() => decimalTo24h(time.end), [time.end]);

    const classStart = useMemo(() => dayjs().hour(startTime.hour).minute(startTime.minute).second(0), [startTime]);
    const classEnd = useMemo(() => dayjs().hour(endTime.hour).minute(endTime.minute).second(0), [endTime]);

    const { status } = useMemo(() => {
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
    }, [classStart, classEnd]);

    return (
        <Animated.View
            layout={LinearTransition.duration(200).easing(Easing.out(Easing.quad))}
            entering={FadeInDown.duration(200).easing(Easing.out(Easing.quad))}
            exiting={FadeOutUp.duration(200).easing(Easing.out(Easing.quad))}
            style={[{ borderWidth: 1, borderColor: "#E5E7EB", backgroundColor: "#FFFFFF", borderRadius: 12, overflow: "hidden" }]}
        >
            <View className="w-full h-20 flex flex-row items-center justify-between px-3">
                <View className="flex flex-row items-center gap-2">
                    <View style={{ backgroundColor: color + "30", borderColor: color + "60" }} className={"relative size-14 rounded-full border-2 flex items-center justify-center"}>
                        <SubjectIcon color={color} />
                    </View>
                    <View>
                        <Text className="text-lg font-poppins-semibold" numberOfLines={1}>
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

            </View>


            <View className="px-3 border-t border-default h-auto">
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
            </View>
        </Animated.View>
    )
}

const MemoizedRoutingCard = memo(RoutingCard);
export default MemoizedRoutingCard;