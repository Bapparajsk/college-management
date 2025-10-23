import { cn } from '@/utils/cn';
import { decimalTo24h, formatHourTo12 } from '@/utils/format';
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

type CountdownMode = "hour" | "minute" | "second";

interface CountdownResult {
    text: string;
    mode: CountdownMode;
    diffSec: number;
}


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
        let timer: ReturnType<typeof setTimeout> | null = null;

        const calculateCountdown = (): CountdownResult => {
            const now = dayjs();
            let diffSec = 0;

            if (now.isBefore(classStart)) {
                diffSec = classStart.diff(now, "second");
            } else if (now.isBefore(classEnd)) {
                diffSec = classEnd.diff(now, "second");
            } else {
                return { text: "00:00:00", mode: "second", diffSec: 0 };
            }

            const hours = Math.floor(diffSec / 3600);
            const minutes = Math.floor((diffSec % 3600) / 60);
            const seconds = diffSec % 60;

            // 💡 Switch to minute display as soon as time is below 3600s
            if (diffSec >= 3600) {
                return {
                    text: `${hours.toString().padStart(2, "0")}h ${minutes
                        .toString()
                        .padStart(2, "0")}m`,
                    mode: "hour",
                    diffSec,
                };
            } else if (diffSec >= 60) {
                return {
                    text: `${minutes.toString().padStart(2, "0")}m ${seconds
                        .toString()
                        .padStart(2, "0")}s`,
                    mode: "minute",
                    diffSec,
                };
            } else {
                return { text: `${seconds.toString().padStart(2, "0")}s`, mode: "second", diffSec };
            }
        };

        const scheduleNext = (diffSec: number, mode: CountdownMode) => {
            // If more than 1 hour left — still update every minute
            if (mode === "hour") {
                const secondsRemainder = diffSec % 60;
                // If exactly 1 hour left, we update right after 59:59 transition
                return secondsRemainder > 0 ? secondsRemainder * 1000 : 60000;
            }
            // For minute or second mode → every second
            return 1000;
        };

        const update = () => {
            const { text, mode, diffSec } = calculateCountdown();
            setCountdown(text);

            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            if (diffSec <= 0) return;

            const nextDelay = scheduleNext(diffSec, mode);
            timer = setTimeout(update, nextDelay);
        };

        update();

        return () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        };
    }, [classStart, classEnd]);


    return (
        <Animated.View
            layout={LinearTransition.duration(200).easing(Easing.out(Easing.quad))}
            entering={FadeInDown.duration(200).easing(Easing.out(Easing.quad))}
            exiting={FadeOutUp.duration(200).easing(Easing.out(Easing.quad))}
            style={[{ borderWidth: 1, borderColor: "#E5E7EB", backgroundColor: "#FFFFFF", borderRadius: 12, overflow: "hidden" }]}
        >
            <View className="w-full h-20 flex flex-row items-center justify-between px-3">
                <View className="w-full flex flex-row items-center gap-2">
                    <View
                        style={{ backgroundColor: color + "30", borderColor: color + "60" }}
                        className={"relative size-14 rounded-full border-2 flex items-center justify-center"}
                    >
                        <SubjectIcon color={color} />
                    </View>
                    <View className='flex-1'>
                        <View className='w-full flex-row justify-between items-center gap-2'>
                            <View className='flex-row items-center gap-1'>
                                <Text numberOfLines={1} className='max-w-72'>
                                    <Text className="text-lg font-poppins-semibold">
                                        {subject}
                                    </Text>
                                    <Text className="text-base font-inter-semibold text-gray-700">
                                        {" "} {teacher?.sortForm && `(${teacher.sortForm})`} {room && `- (${room})`}
                                    </Text>
                                </Text>
                            </View>

                            <View
                                className={`text-xs font-poppins-semibold px-2 py-0.5 rounded-full border 
                                    ${status === "Upcoming"
                                        ? "bg-yellow-200 border-yellow-400"
                                        : status === "Ongoing"
                                            ? "bg-green-200 border-green-400"
                                            : "bg-gray-200 border-default"
                                    }`}
                            >
                                {(
                                    <Text
                                        className={cn("text-xs font-poppins-semibold ",
                                            status === "Upcoming" ? "text-yellow-700" :
                                                status === "Ongoing" ? "text-green-700" : "text-gray-600"
                                        )}
                                    >
                                        {status === "Completed" && "Class finished" || countdown}
                                    </Text>
                                )}
                            </View>

                        </View>
                        <Text className="text-base font-poppins text-gray-600">
                            {formatHourTo12(time.start)} - {formatHourTo12(time.end)}
                        </Text>
                    </View>
                </View>
            </View>
            <View className="px-3 border-t border-dashed border-default h-auto">
                <View className="py-2">
                    <View className="flex-row justify-between items-center mb-1">
                        <Text className="text-sm font-poppins-semibold text-gray-700">Class Details:</Text>
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
                            <ClassTypeIcon size={14} color={color} />
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