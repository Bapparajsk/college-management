import dayjs from "dayjs";

export function getFriendlyDateName(date: Date): string {
    const today = dayjs();
    const target = dayjs(date);

    if (target.isSame(today, "day")) return "Today";
    if (target.isSame(today.subtract(1, "day"), "day")) return "Yesterday";
    if (target.isSame(today.add(1, "day"), "day")) return "Tomorrow";

    const day = target.date();
    const suffix =
        day % 10 === 1 && day !== 11
            ? "st"
            : day % 10 === 2 && day !== 12
                ? "nd"
                : day % 10 === 3 && day !== 13
                    ? "rd"
                    : "th";

    return `${target.format("ddd, MMM")} ${day}${suffix}`;
}
