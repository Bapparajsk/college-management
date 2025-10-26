import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    AccessibilityInfo,
    Dimensions,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// TypeScript-first, dependency-free calendar component for React Native
// Features:
// - Month horizontal virtualized list for performance
// - Day grid per month
// - Single date select, range select, multi-select
// - Min/max dates, marked dates
// - Modern light theme customizable via props
// - Memoization, getItemLayout for performance

// You can optionally use `dayjs` or `date-fns` to replace the date helpers below for more features/locales.

type CalendarMode = 'single' | 'range' | 'multiple';

export type CalendarProps = {
    startDate?: Date; // initial visible month
    mode?: CalendarMode;
    selected?: Date | Date[] | { from: Date; to: Date } | null;
    onChange?: (value: Date | Date[] | { from: Date; to: Date } | null) => void;
    markedDates?: Record<string, { color?: string; text?: string }>; // keyed by yyyy-mm-dd
    minDate?: Date;
    maxDate?: Date;
    locale?: string;
    monthHeight?: number; // for getItemLayout
    theme?: Partial<typeof defaultTheme>;
    weekStartsOn?: 0 | 1; // 0 = Sunday, 1 = Monday
    showAdjacentMonths?: boolean;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const defaultTheme = {
    background: '#FFFFFF',
    surface: '#F7F8FA',
    primary: '#2563EB', // blue-600
    text: '#0F172A',
    subduedText: '#64748B',
    marker: '#10B981', // green-500
    todayBorder: '#F97316', // orange-500
    radius: 10,
    daySize: 40,
    weekLabelColor: '#374151',
};

// ---------- date helpers (no external deps) ----------
function startOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
function addMonths(date: Date, n: number) {
    return new Date(date.getFullYear(), date.getMonth() + n, 1);
}
function formatYMD(date: Date) {
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    return `${y}-${m}-${d}`;
}
function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function daysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
function dayOfWeek(date: Date) {
    return date.getDay();
}
function clampDate(d: Date, min?: Date, max?: Date) {
    if (min && d < min) return min;
    if (max && d > max) return max;
    return d;
}

// ---------- Calendar component ----------
export default function Calendar({
    startDate = new Date(),
    mode = 'single',
    selected = null,
    onChange,
    markedDates = {},
    minDate,
    maxDate,
    locale = 'en-US',
    monthHeight = 320,
    theme = {},
    weekStartsOn = 0,
    showAdjacentMonths = true,
}: CalendarProps) {
    const mergedTheme = useMemo(() => ({ ...defaultTheme, ...theme }), [theme]);

    // Keep an index offset so we can show a large scroll window without too many items.
    // We'll render 240 months (20 years) centered around the startDate for usability. This keeps virtualization safe.
    const RANGE_MONTHS = 240;
    const centerIndex = Math.floor(RANGE_MONTHS / 2);

    const initialMonth = startOfMonth(startDate);
    const baseMonth = useMemo(() => {
        // compute a base month such that centerIndex corresponds to initialMonth
        const b = addMonths(initialMonth, -centerIndex);
        return b;
    }, [initialMonth, centerIndex]);

    const listRef = useRef<FlatList>(null);

    // internal selected state when user interacts; keep controlled/uncontrolled behavior
    const [internalSelected, setInternalSelected] = useState(() => selected ?? null);

    useEffect(() => {
        setInternalSelected(selected ?? null);
    }, [selected]);

    // Accessibility announce on selection (lightweight)
    const announce = useCallback((message: string) => {
        if (Platform.OS === 'android' || Platform.OS === 'ios') {
            AccessibilityInfo.announceForAccessibility && AccessibilityInfo.announceForAccessibility(message);
        }
    }, []);

    // ---- selection helpers ----
    const handlePressDay = useCallback(
        (day: Date) => {
            if (minDate && day < minDate) return;
            if (maxDate && day > maxDate) return;

            if (mode === 'single') {
                setInternalSelected(day);
                onChange && onChange(day);
                announce(`Selected ${day.toDateString()}`);
                return;
            }

            if (mode === 'multiple') {
                const arr = Array.isArray(internalSelected) ? [...internalSelected] : [];
                const idx = arr.findIndex((d: Date) => isSameDay(d, day));
                if (idx >= 0) arr.splice(idx, 1);
                else arr.push(day);
                setInternalSelected(arr);
                onChange && onChange(arr);
                announce(`${arr.length} dates selected`);
                return;
            }

            // range mode
            if (mode === 'range') {
                if (!internalSelected || (internalSelected as any).from === undefined) {
                    const range = { from: day, to: day };
                    setInternalSelected(range);
                    onChange && onChange(range);
                    announce(`Range start ${day.toDateString()}`);
                    return;
                }
                const cur = internalSelected as { from: Date; to: Date };
                if (cur && cur.from && (!cur.to || isSameDay(cur.from, cur.to))) {
                    // set to
                    if (day < cur.from) {
                        const flipped = { from: day, to: cur.from };
                        setInternalSelected(flipped);
                        onChange && onChange(flipped);
                        announce(`Range ${flipped.from.toDateString()} to ${flipped.to.toDateString()}`);
                        return;
                    }
                    const updated = { from: cur.from, to: day };
                    setInternalSelected(updated);
                    onChange && onChange(updated);
                    announce(`Range ${updated.from.toDateString()} to ${updated.to.toDateString()}`);
                    return;
                }
                // default fallback
                const r = { from: day, to: day };
                setInternalSelected(r);
                onChange && onChange(r);
                announce(`Range start ${day.toDateString()}`);
            }
        },
        [internalSelected, mode, minDate, maxDate, onChange, announce],
    );

    // ---- month rendering data ----
    const months = useMemo(() => {
        const out: Date[] = [];
        for (let i = 0; i < RANGE_MONTHS; i++) {
            out.push(addMonths(baseMonth, i));
        }
        return out;
    }, [baseMonth]);

    const getItemLayout = useCallback((_: any, index: number) => {
        return { length: monthHeight, offset: monthHeight * index, index };
    }, [monthHeight]);

    const renderItem = useCallback(
        ({ item: month }: { item: Date }) => {
            return (
                <View style={[styles.monthContainer, { height: monthHeight, width: SCREEN_WIDTH }]}>
                    <MonthView
                        month={month}
                        onPressDay={handlePressDay}
                        selected={internalSelected}
                        markedDates={markedDates}
                        theme={mergedTheme}
                        minDate={minDate}
                        maxDate={maxDate}
                        locale={locale}
                        weekStartsOn={weekStartsOn}
                        showAdjacentMonths={showAdjacentMonths}
                    />
                </View>
            );
        },
        [handlePressDay, internalSelected, markedDates, mergedTheme, minDate, maxDate, locale, monthHeight, weekStartsOn, showAdjacentMonths],
    );

    // scroll to initial month
    useEffect(() => {
        // find index of startDate
        const diffMonths = (initialMonth.getFullYear() - baseMonth.getFullYear()) * 12 + (initialMonth.getMonth() - baseMonth.getMonth());
        setTimeout(() => {
            if (listRef.current) listRef.current.scrollToIndex({ index: diffMonths, animated: false });
        }, 0);
    }, [initialMonth, baseMonth]);

    // small header controls
    const goToPrev = useCallback(() => {
        if (!listRef.current) return;
        listRef.current.scrollToOffset({ offset: Math.max(0, (centerIndex - 1) * monthHeight), animated: true });
    }, [centerIndex, monthHeight]);

    const goToNext = useCallback(() => {
        if (!listRef.current) return;
        listRef.current.scrollToOffset({ offset: Math.min(RANGE_MONTHS - 1, (centerIndex + 1) * monthHeight), animated: true });
    }, [centerIndex, monthHeight]);

    // simple header display of focused month (approximate)
    const [visibleMonthTitle, setVisibleMonthTitle] = useState(() => initialMonth.toLocaleString(locale, { month: 'long', year: 'numeric' }));

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems && viewableItems.length) {
            const mid = viewableItems[Math.floor(viewableItems.length / 2)];
            if (mid) setVisibleMonthTitle(mid.item.toLocaleString(locale, { month: 'long', year: 'numeric' }));
        }
    }).current;

    return (
        <View style={[styles.wrapper, { backgroundColor: mergedTheme.background }]}>
            <View style={[styles.header, { backgroundColor: mergedTheme.surface, borderRadius: mergedTheme.radius }]}>
                <TouchableOpacity accessibilityRole="button" onPress={() => listRef.current?.scrollToIndex({ index: 0, animated: true })}>
                    <Text style={[styles.headerSmall, { color: mergedTheme.subduedText }]}>Today</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: mergedTheme.text }]}>{visibleMonthTitle}</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => listRef.current?.scrollToOffset({ offset: Math.max(0, (centerIndex - 4) * monthHeight), animated: true })}>
                        <Text style={[styles.headerSmall, { color: mergedTheme.primary }]}>◀</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => listRef.current?.scrollToOffset({ offset: Math.min(RANGE_MONTHS - 1, (centerIndex + 4) * monthHeight), animated: true })}>
                        <Text style={[styles.headerSmall, { color: mergedTheme.primary }]}>▶</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                ref={listRef}
                data={months}
                keyExtractor={(m) => m.toISOString()}
                renderItem={renderItem}
                getItemLayout={getItemLayout}
                initialNumToRender={3}
                maxToRenderPerBatch={5}
                windowSize={5}
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            />
        </View>
    );
}

// ---------- MonthView component ----------
function MonthView({
    month,
    onPressDay,
    selected,
    markedDates,
    theme,
    minDate,
    maxDate,
    locale,
    weekStartsOn,
    showAdjacentMonths,
}: any) {
    const label = month.toLocaleString(locale, { month: 'long', year: 'numeric' });
    const first = startOfMonth(month);
    const firstWeekday = (dayOfWeek(first) + 7 - weekStartsOn) % 7;
    const totalDays = daysInMonth(month);
    const prevMonthDays = firstWeekday; // number of blank slots from previous month

    const totalCells = Math.ceil((prevMonthDays + totalDays) / 7) * 7;

    const cells = useMemo(() => {
        const arr: { date: Date | null; inMonth: boolean }[] = [];
        for (let i = 0; i < totalCells; i++) {
            const dayIndex = i - prevMonthDays + 1;
            if (dayIndex < 1) {
                const d = new Date(month.getFullYear(), month.getMonth(), dayIndex);
                arr.push({ date: d, inMonth: false });
            } else if (dayIndex > totalDays) {
                const d = new Date(month.getFullYear(), month.getMonth(), dayIndex);
                arr.push({ date: d, inMonth: false });
            } else {
                const d = new Date(month.getFullYear(), month.getMonth(), dayIndex);
                arr.push({ date: d, inMonth: true });
            }
        }
        return arr;
    }, [month, totalCells, prevMonthDays, totalDays]);

    return (
        <View style={styles.monthInner}>
            <Text style={[styles.monthLabel, { color: theme.text }]}>{label}</Text>
            <WeekLabels locale={locale} weekStartsOn={weekStartsOn} theme={theme} />
            <View style={styles.grid}>
                {cells.map((c, idx) => (
                    <DayCell
                        key={idx}
                        date={c.date}
                        inMonth={c.inMonth}
                        onPress={onPressDay}
                        selected={selected}
                        markedDates={markedDates}
                        theme={theme}
                        minDate={minDate}
                        maxDate={maxDate}
                        showAdjacentMonths={showAdjacentMonths}
                    />
                ))}
            </View>
        </View>
    );
}

function WeekLabels({ locale, weekStartsOn, theme }: any) {
    const base = new Date(2020, 5, 7); // sunday
    const labels = [] as string[];
    for (let i = 0; i < 7; i++) {
        const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + ((i + weekStartsOn) % 7));
        labels.push(d.toLocaleString(locale, { weekday: 'short' }));
    }
    return (
        <View style={styles.weekRow}>
            {labels.map((l, i) => (
                <Text key={i} style={[styles.weekLabel, { color: theme.weekLabelColor }]}>{l}</Text>
            ))}
        </View>
    );
}

const DayCell = React.memo(function DayCell({ date, inMonth, onPress, selected, markedDates, theme, minDate, maxDate, showAdjacentMonths }: any) {
    // if date === null render empty
    if (!date) return <View style={{ width: theme.daySize, height: theme.daySize }} />;

    const disabled = (minDate && date < minDate) || (maxDate && date > maxDate);
    const isToday = isSameDay(date, new Date());

    // determine selection state
    let selectedState = false;
    let inRange = false;

    if (selected) {
        if (selected instanceof Date) selectedState = isSameDay(selected, date);
        else if (Array.isArray(selected)) selectedState = selected.some((d: Date) => isSameDay(d, date));
        else if ((selected as any).from) {
            const { from, to } = selected as { from: Date; to: Date };
            if (from && to) {
                const start = from < to ? from : to;
                const end = to > from ? to : from;
                inRange = date >= start && date <= end;
                selectedState = isSameDay(date, from) || isSameDay(date, to);
            }
        }
    }

    const mark = markedDates[formatYMD(date)];

    const onPressCell = () => {
        if (disabled) return;
        onPress && onPress(date);
    };

    // when not inMonth and showAdjacentMonths is false -> render placeholder
    if (!inMonth && !showAdjacentMonths) {
        return <View style={{ width: theme.daySize, height: theme.daySize }} />;
    }

    return (
        <TouchableOpacity
            accessibilityRole="button"
            onPress={onPressCell}
            style={{ width: theme.daySize, height: theme.daySize, alignItems: 'center', justifyContent: 'center' }}
            activeOpacity={0.7}
        >
            <View
                style={[
                    styles.dayWrap,
                    { width: theme.daySize - 6, height: theme.daySize - 6, borderRadius: (theme.daySize - 6) / 2 },
                    selectedState || inRange ? { backgroundColor: selectedState ? theme.primary : theme.surface } : null,
                    disabled ? { opacity: 0.35 } : null,
                    isToday ? { borderWidth: 1.5, borderColor: theme.todayBorder } : null,
                ]}
            >
                <Text style={[styles.dayText, { color: selectedState ? '#fff' : theme.text, fontSize: 13 }]}>{date.getDate()}</Text>
            </View>
            {mark ? <View style={[styles.marker, { backgroundColor: mark.color ?? theme.marker }]} /> : null}
        </TouchableOpacity>
    );
});

// ---------- styles ----------
const styles = StyleSheet.create({
    wrapper: {
        padding: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        marginBottom: 8,
    },
    headerTitle: { fontSize: 16, fontWeight: '600' },
    headerSmall: { fontSize: 13 },
    headerRight: { flexDirection: 'row', alignItems: 'center' },
    monthContainer: {
        paddingVertical: 8,
        alignItems: 'center',
    },
    monthInner: { width: SCREEN_WIDTH - 12 * 2, alignItems: 'center' },
    monthLabel: { fontSize: 15, fontWeight: '600', marginBottom: 8 },
    weekRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 12, marginBottom: 6 },
    weekLabel: { width: 40, textAlign: 'center', fontSize: 12 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', width: '100%', paddingHorizontal: 12 },
    dayWrap: { alignItems: 'center', justifyContent: 'center' },
    dayText: { fontSize: 12 },
    monthLabelSmall: { fontSize: 13 },
    marker: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
});

// ---------- Usage Example ----------
// In your app screen:
// <Calendar
//   startDate={new Date()}
//   mode="range"
//   onChange={(val) => console.log('selected', val)}
//   markedDates={{ '2025-10-31': { color: '#ff5a5f' } }}
//   theme={{ primary: '#7c3aed' }}
// />
