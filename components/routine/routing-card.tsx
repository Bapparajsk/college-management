import { decimalTo24h, formatHourTo12, formatTime, getSubjectColor } from '@/utils/format';
import { default as dayjs } from 'dayjs';
import { Atom, Beaker, BookOpen, Calculator, CalendarDays, ChevronDown, Cpu, FlaskConical, GraduationCap, MessageSquareText, Monitor, NotebookText, Ruler, Wrench } from 'lucide-react-native';
import { memo, ReactNode, useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { RoutingDetails } from './routing-details';


const RoutingCard = ({ subject, classType, time, room, teacher, topics }: RoutingDetails) => {

    const [expanded, setExpanded] = useState(false);
    const [now, setNow] = useState(dayjs());

    const height = useSharedValue(72);
    const rotation = useSharedValue(0);

    const startTime = decimalTo24h(time.start);
    const endTime = decimalTo24h(time.end);
    const iconColor = getSubjectColor(subject);

    const classStart = dayjs().hour(startTime.hour).minute(startTime.minute).second(0);
    const classEnd = dayjs().hour(endTime.hour).minute(endTime.minute).second(0);

    const animatedStyle = useAnimatedStyle(() => ({ height: height.value }));

    const SubjectIcon = useMemo(() => getSubjectIcon(subject, "#4561F9"), [subject]);


    const toggleExpand = () => {
        setExpanded((prev) => !prev);
        height.value = withTiming(expanded ? 72 : 144, { duration: 400 });
        rotation.value = withTiming(expanded ? 0 : 180, { duration: 400 });
    };

    // Animated style for Chevron
    const rotateStyleIcon = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        };
    });


    useEffect(() => {
        const interval = setInterval(() => {
            setNow(dayjs());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    let status = "";
    let countdown = "";

    if (now.isBefore(classStart)) {
        status = "Upcoming";
        const diff = classStart.diff(now, "second");
        countdown = formatTime(diff);
    } else if (now.isAfter(classStart) && now.isBefore(classEnd)) {
        status = "Ongoing";
        const diff = classEnd.diff(now, "second");
        countdown = formatTime(diff);
    } else {
        status = "Completed";
        countdown = "00:00:00";
    }

    return (
        <Animated.View
            layout={LinearTransition.springify()}
            style={[{ borderWidth: 1, borderColor: "#E5E7EB", backgroundColor: "#FFFFFF", borderRadius: 12, overflow: "hidden", }, animatedStyle,]}
        >
            <View className="w-full h-20 flex flex-row items-center justify-between px-3">
                <View className="flex flex-row items-center gap-2">
                    <View style={{ backgroundColor: iconColor + "40" }} className="size-14 rounded-full border border-default flex items-center justify-center">
                        {SubjectIcon}
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
                <TouchableOpacity activeOpacity={0.7} onPress={toggleExpand} className="p-2">
                    <Animated.View style={rotateStyleIcon}>
                        <ChevronDown color="#6B7280" />
                    </Animated.View>
                </TouchableOpacity>
            </View>

            {expanded && (<View className="h-20 px-3 py-2 border-t border-default">
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
                        {getClassTypeIcon(classType)}
                        <Text className="ml-1 text-xs font-poppins text-gray-600">{classType}</Text>
                    </View>

                    {/* Topics */}
                    <View className="flex-row items-center w-[48%] mb-1">
                        <NotebookText size={14} color="#6B7280" />
                        <Text className="ml-1 text-xs font-poppins text-gray-600">{topics || <Text className="text-gray-400">No topics assigned</Text>}</Text>
                    </View>
                </View>
            </View>)}
        </Animated.View>
    )
}


export function getClassTypeIcon(classType: string | undefined): ReactNode {
    switch (classType?.toLowerCase()) {
        case "lecture":
            return <BookOpen size={16} color="#6B7280" />; // open book icon for lecture
        case "lab":
            return <Beaker size={16} color="#6B7280" />; // beaker icon for lab
        case "tutorial":
            return <Cpu size={16} color="#6B7280" />; // CPU icon for tutorial
        case "seminar":
            return <Monitor size={16} color="#6B7280" />; // monitor icon for seminar
        default:
            return <BookOpen size={16} color="#6B7280" />; // default icon
    }
}



export function getSubjectIcon(sub: string, color: string): ReactNode {
    const t = sub.toLowerCase();

    if (t.includes("physics")) {
        return <Atom color={color} />;
    } else if (t.includes("chemistry")) {
        return <FlaskConical color={color} />;
    } else if (t.includes("math")) {
        return <Calculator color={color} />;
    } else if (t.includes("english") || t.includes("communication") || t.includes("skills")) {
        return <MessageSquareText color={color} />;
    } else if (t.includes("workshop")) {
        return <Wrench color={color} />;
    } else if (t.includes("graphics") || t.includes("drawing")) {
        return <Ruler color={color} />;
    } else {
        return <Atom color={color} />;
    }
}

const MemoizedRoutingCard = memo(RoutingCard);
export default MemoizedRoutingCard;