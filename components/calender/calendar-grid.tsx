import { cn } from '@/utils/cn';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CalendarDay } from './type';

interface CalendarGridProps {
    days: CalendarDay[];
    onSelectDate: (date: Date) => void;
    viewMode: 'month' | 'week' | 'day';
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
    days,
    onSelectDate,
    viewMode
}) => {

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (viewMode === 'day') {
        const day = days.find(d => d.isSelected) || days[0];
        return (
            <ScrollView className={cn('flex-1 bg-white')}>
                <View className={cn('p-4')}>
                    <Text className={cn('text-lg font-semibold text-gray-900 mb-4')}>
                        Events for {day.date.toLocaleDateString()}
                    </Text>
                    {day.events.map(event => (
                        <View key={event.id} className={cn('bg-primary-50 p-3 rounded-lg mb-2')}>
                            <Text className={cn('font-medium text-gray-900')}>{event.title}</Text>
                            <Text className={cn('text-gray-600 text-sm')}>
                                {event.startTime} - {event.endTime}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        );
    }

    return (
        <View className={cn('flex-1 bg-white')}>
            <View className={cn('flex-row border-b border-gray-200')}>
                {weekDays.map(day => (
                    <View key={day} className={cn('flex-1 py-3')}>
                        <Text className={cn('text-center text-sm font-medium text-gray-600')}>
                            {day}
                        </Text>
                    </View>
                ))}
            </View>

            <View className={cn('flex-row flex-wrap')}>
                {days.map((day, index) => (
                    <TouchableOpacity
                        key={index}
                        className={cn(`w-1/7 p-2 border-b border-r border-gray-100 ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                            } ${day.isSelected ? 'bg-primary-50' : ''}`)}
                        onPress={() => onSelectDate(day.date)}
                    >
                        <View className={cn(`items-center justify-center w-8 h-8 rounded-full ${day.isToday ? 'bg-primary-500' : ''
                            } ${day.isSelected && !day.isToday ? 'bg-primary-100' : ''}`)}>
                            <Text className={cn(`text-sm font-medium ${day.isToday ? 'text-white' :
                                    day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                                }`)}>
                                {day.date.getDate()}
                            </Text>
                        </View>

                        {day.events.length > 0 && (
                            <View className={cn('mt-1')}>
                                {day.events.slice(0, 2).map(event => (
                                    <View
                                        key={event.id}
                                        className={cn('h-1 bg-primary-500 rounded-full mb-1')}
                                    />
                                ))}
                                {day.events.length > 2 && (
                                    <Text className={cn('text-xs text-gray-500 text-center')}>
                                        +{day.events.length - 2}
                                    </Text>
                                )}
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default React.memo(CalendarGrid);