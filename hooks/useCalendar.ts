import { useCallback, useMemo, useState } from 'react';
import { CalendarDay, CalendarEvent, ViewMode } from '../components/calender/type';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const getDaysInMonth = useCallback((year: number, month: number): Date[] => {
    return new Array(31)
      .fill(null)
      .map((_, i) => new Date(year, month, i + 1))
      .filter(date => date.getMonth() === month);
  }, []);

  const generateCalendarDays = useCallback((): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDay = firstDay.getDay();
    const endDay = lastDay.getDay();
    
    const prevMonthDays = getDaysInMonth(year, month - 1).slice(-startDay);
    const nextMonthDays = getDaysInMonth(year, month + 1).slice(0, 6 - endDay);
    
    const calendarDays: CalendarDay[] = [
      ...prevMonthDays.map(date => ({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: selectedDate.toDateString() === date.toDateString(),
        events: events.filter(event => 
          event.date.toDateString() === date.toDateString()
        ),
      })),
      ...daysInMonth.map(date => ({
        date,
        isCurrentMonth: true,
        isToday: new Date().toDateString() === date.toDateString(),
        isSelected: selectedDate.toDateString() === date.toDateString(),
        events: events.filter(event => 
          event.date.toDateString() === date.toDateString()
        ),
      })),
      ...nextMonthDays.map(date => ({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: selectedDate.toDateString() === date.toDateString(),
        events: events.filter(event => 
          event.date.toDateString() === date.toDateString()
        ),
      })),
    ];

    return calendarDays;
  }, [currentDate, selectedDate, events, getDaysInMonth]);

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  }, []);

  const navigateWeek = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
      return newDate;
    });
  }, []);

  const navigateDay = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  }, []);

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setCurrentDate(date);
  }, []);

  const addEvent = useCallback((event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
    };
    setEvents(prev => [...prev, newEvent]);
  }, []);

  const calendarDays = useMemo(() => generateCalendarDays(), [generateCalendarDays]);

  return {
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
    events,
  };
};