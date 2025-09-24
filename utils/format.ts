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

export function formatNumber(num: number | string): string {
    if (typeof num === "string") {
        num = parseFloat(num);
    }

    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "b";
    }
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
    }
    if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toString();
}


export function getReadableRoot(pathname?: string): string {
    if(!pathname) {
        return "Back"
    }

    if (pathname === "/") {
        return "Home";
    }

    // remove query params and hash
    const cleanPath = pathname.split(/[?#]/)[0];

    // split into segments
    const segments = cleanPath.split("/").filter(Boolean);

    if (segments.length === 0) return "Home";

    // take first segment (root)
    let root = segments[0];

    // remove special chars like (group) or [dynamic]
    root = root.replace(/[()[\]]/g, "");

    return root || "Home";
}
