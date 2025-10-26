import AddEventModal from '@/components/calender/add-event-modal';
import CalendarGrid from '@/components/calender/calendar-grid';
import CalendarHeader from '@/components/calender/calendar-header';
import { Button } from '@/components/ui/button';
import { useCalendar } from '@/hooks/useCalendar';
import { cn } from '@/utils/cn';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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

      <TouchableOpacity
        className={cn('absolute bottom-6 right-6 w-14 h-14 bg-primary-500 rounded-full items-center justify-center shadow-lg')}
        onPress={() => setShowAddEvent(true)}
      >
        <Text className={cn('text-white text-2xl')}>+</Text>
      </TouchableOpacity>

      <AddEventModal
        visible={showAddEvent}
        selectedDate={selectedDate}
        onClose={() => setShowAddEvent(false)}
        onAddEvent={addEvent}
      />
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={[1, '50%']}
        style={{

        }}
      >
        <BottomSheetView style={{ alignItems: 'center' }}>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>

        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}