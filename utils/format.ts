export function formatHourTo12(hour: number): string {
    if (hour < 0 || hour > 24) {
        throw new Error("Hour must be between 0 and 24");
    }

    // Separate hours and minutes
    const baseHour = Math.floor(hour);
    const minutes = Math.round((hour - baseHour) * 60);

    // Convert to 12-hour format
    const h = baseHour % 12 === 0 ? 12 : baseHour % 12;
    const suffix = baseHour >= 12 && baseHour < 24 ? "PM" : "AM";

    // Format minutes properly
    const m = minutes.toString().padStart(2, "0");

    return `${h}:${m} ${suffix}`;
}

export function decimalTo24h(decimal: number): { hour: number; minute: number } {
    if (decimal < 0 || decimal > 24) {
        throw new Error("Value must be between 0 and 24");
    }

    const hour = Math.floor(decimal);                   // whole hours
    const minute = Math.round((decimal - hour) * 60);   // remaining minutes

    return {
        hour: hour === 24 ? 0 : hour, // 24 → 0 (midnight wrap)
        minute: minute === 60 ? 0 : minute, // handle rounding edge case
    };
}

export function formatTime(seconds: number) {
        const h = Math.floor(seconds / 3600)
            .toString()
            .padStart(2, "0");
        const m = Math.floor((seconds % 3600) / 60)
            .toString()
            .padStart(2, "0");
        const s = Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");
        return `${h}:${m}:${s}`;
    }

export function getSubjectColor(subject: string): string {
    const s = subject.toLowerCase();

    if (s.includes("physics")) {
        return "#4F46E5"; // blue
    } else if (s.includes("chemistry")) {
        return "#F1BA00"; // yellow/gold
    } else if (s.includes("math")) {
        return "#4561F9"; // dark blue
    } else if (s.includes("english") || s.includes("communication") || s.includes("skills")) {
        return "#C400F7"; // pink/purple
    } else if (s.includes("workshop")) {
        return "#C400F7"; // pink/purple
    } else if (s.includes("graphics") || s.includes("drawing")) {
        return "#C400F7"; // pink/purple
    } else {
        return "#4F46E5"; // default blue
    }
}
