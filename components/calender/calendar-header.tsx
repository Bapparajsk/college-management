import { cn } from '@/utils/cn';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../ui/button';
import { ViewMode } from './type';

interface CalendarHeaderProps {
    currentDate: Date;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    onNavigate: (direction: 'prev' | 'next') => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    currentDate,
    viewMode,
    onViewModeChange,
    onNavigate,
}) => {

    const formatHeaderDate = () => {
        switch (viewMode) {
            case 'month':
                return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            case 'week':
                return `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
            case 'day':
                return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
            default:
                return currentDate.toLocaleDateString();
        }
    };

    return (
        <View className={cn('bg-white px-4 py-3 border-b border-gray-200')}>
            <View className={cn('flex-row items-center justify-between mb-3')}>
                <Text className={cn('text-2xl font-bold text-gray-900')}>
                    {formatHeaderDate()}
                </Text>

                <View className={cn('flex-row space-x-2')}>
                    <TouchableOpacity
                        className={cn('px-3 py-1 rounded-lg bg-gray-100')}
                        onPress={() => onNavigate('prev')}
                    >
                        <Text className={cn('text-gray-700 font-medium')}>Prev</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={cn('px-3 py-1 rounded-lg bg-gray-100')}
                        onPress={() => onNavigate('next')}
                    >
                        <Text className={cn('text-gray-700 font-medium')}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className={cn('flex-row bg-gray-100 rounded-lg p-1')}>
                {(['month', 'week', 'day'] as ViewMode[]).map((mode) => (
                    <Button
                        key={mode}
                        className={cn(`flex-1 py-2 rounded-md ${viewMode === mode ? 'bg-white shadow-sm' : ''
                            }`)}
                        onPress={() => onViewModeChange(mode)}
                    >
                        <Text
                            className={cn(`text-center font-medium ${viewMode === mode ? 'text-primary-600' : 'text-gray-600'
                                }`)}
                        >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </Text>
                    </Button>
                ))}
            </View>
        </View>
    );
};

export default React.memo(CalendarHeader);