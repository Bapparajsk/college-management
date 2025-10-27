import CalendarGrid from '@/components/calender/calendar-grid';
import CalendarHeader from '@/components/calender/calendar-header';
import { Button } from '@/components/ui/button';
import { useCalendar } from '@/hooks/useCalendar';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';

export default function Index() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  // const { expand } = useBottomSheet();

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [showAddEvent, setShowAddEvent] = useState(false);

  const {
    currentDate,
    selectedDate,
    viewMode,
    setViewMode,
    calendarDays,
    navigateMonth,
    navigateWeek,
    navigateDay,
    selectDate,
    addEvent,
  } = useCalendar();

  const handleNavigate = (direction: 'prev' | 'next') => {
    switch (viewMode) {
      case 'month':
        navigateMonth(direction);
        break;
      case 'week':
        navigateWeek(direction);
        break;
      case 'day':
        navigateDay(direction);
        break;
    }
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Button onPress={() => bottomSheetRef.current?.expand()}>
        Open Bottom Sheet
      </Button>
      <View className='flex-1 mt-4 h-auto rounded-lg overflow-hidden border border-gray-200'>
        <CalendarHeader
          currentDate={currentDate}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onNavigate={handleNavigate}
        />
        <CalendarGrid
          days={calendarDays}
          onSelectDate={selectDate}
          viewMode={viewMode}
        />
      </View>
      
    </View>
  )
}