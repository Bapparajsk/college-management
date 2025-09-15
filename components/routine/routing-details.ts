export type RoutingDetails = {
    subject: string;
    classType?: "Lecture" | "Drawing" | "Lab" | "Workshop"| "game";
    time: { start: number; end: number };
    room?: string;
    teacher?: { sortForm: string; fullName: string };
    topics?: string;
    icon: React.ReactNode;
    color: `#${string}`;
}

export type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";



export const routingDetails: Record<Day, RoutingDetails[]> = {
    "Monday": [
        {
            subject: "Applied Physics - 1",
            classType: "Lecture",
            time: { start: 10.5, end: 11.5 },
            room: "A-3",
            teacher: { sortForm: "S.P", fullName: "Sujit Pathak" },
        },
        {
            subject: "C.SKILLS in English",
            classType: "Lecture",
            time: { start: 11.5, end: 12.5 },
            room: "A-3",
            teacher: { sortForm: "P.T", fullName: "Priyank Tiwari" },
        },
        {
            subject: "Library",
            time: { start: 12.5, end: 13.5 },
        }, 
        {
            subject: "Mathematics - 1",
            classType: "Lecture",
            time: { start: 14, end: 15 },
            room: "A-3",
            teacher: { sortForm: "S.D", fullName: "Subrata Das" },
        },
        {
            subject: "Applied Chemistry",
            classType: "Lecture",
            time: { start: 15, end: 16 },
            room: "A-3",
            teacher: { sortForm: "R.D", fullName: "Rajdeep Das" },
        },
        {
            subject: "C.SKILLS in English",
            classType: "Lecture",
            time: { start: 16, end: 17 },
            room: "A-3",
            teacher: { sortForm: "P.T", fullName: "Priyank Tiwari" },
        },
    ],
    "Tuesday": [
        {
            subject: "C.SKILLS in English",
            classType: "Lecture",
            time: { start: 10.5, end: 11.5 },
            room: "A-3",
            teacher: { sortForm: "P.T", fullName: "Priyank Tiwari" },
        },
        {
            subject: "Mathematics - 1",
            classType: "Lecture",
            time: { start: 11.5, end: 12.5 },
            room: "A-3",
            teacher: { sortForm: "S.D", fullName: "Subrata Das" },
        },
        {
            subject: "Applied Chemistry",
            classType: "Drawing",
            time: { start: 14, end: 17 },
            teacher: { sortForm: "S.L", fullName: "Saifuddin Laskar" },
        },
    ],
    "Wednesday": [
        {
            subject: "Applied Phy-1/Chem (B-1/2)",
            classType: "Lab",
            time: { start: 10.5, end: 12.5 },
            teacher: { sortForm: "S.P/R.D", fullName: "Sujit Pathak / Rajdeep Das" },
        },
        {
            subject: "Applied Physics - 1",
            classType: "Lecture",
            time: { start: 12.5, end: 13.5 },
            room: "A-3",
            teacher: { sortForm: "S.P", fullName: "Sujit Pathak" },
        },
        {
            subject: "Mathematics - 1",
            classType: "Lecture",
            time: { start: 14, end: 15 },
            room: "A-3",
            teacher: { sortForm: "S.D", fullName: "Subrata Das" },
        },
        {
            subject: "C.SKILLS in English",
            classType: "Lecture",
            time: { start: 15, end: 16 },
            room: "A-3",
            teacher: { sortForm: "P.T", fullName: "Priyank Tiwari" },
        },
        {
            subject: "Applied Chemistry",
            classType: "Lecture",
            time: { start: 16, end: 17 },
            room: "A-3",
            teacher: { sortForm: "R.D", fullName: "Rajdeep Das" },
        },
    ],
    "Thursday": [
        {
            subject: "C.SKILLS in English",
            classType: "Lab",
            time: { start: 10.5, end: 12.5 },
            room: "-",
            teacher: { sortForm: "P.T", fullName: "Priyank Tiwari" },
        },
        {
            subject: "Applied Chemistry",
            classType: "Lecture",
            time: { start: 12.5, end: 13.5 },
            room: "A-3",
            teacher: { sortForm: "R.D", fullName: "Rajdeep Das" },
        }, 
        {
            subject: "Mathematics - 1",
            classType: "Lecture",
            time: { start: 14, end: 15 },
            room: "A-3",
            teacher: { sortForm: "S.D", fullName: "Subrata Das" },
        },
        {
            subject: "Applied Physics - 1",
            classType: "Lecture",
            time: { start: 15, end: 16 },
            room: "A-3",
            teacher: { sortForm: "S.P", fullName: "Sujit Pathak" },
        },
        {
            subject: "Sports & Yoga",
            classType: "game",
            time: { start: 16, end: 17 },
            room: "A-3",
            teacher: { sortForm: "P.T", fullName: "Priyank Tiwari" },
        },
    ],
    "Friday": [
        {
            subject: "Engineering Workshop",
            classType: "Workshop",
            time: { start: 10.5, end: 13.5 },
            room: "A-3",
            teacher: { sortForm: "M.M+S.R+R.P", fullName: "M.M+S.R+R.P" }, // moumita mallick, sumeswar ram, ranjit panday
        },
        {
            subject: "Applied Phy-1/Chem (B-2/1)",
            classType: "Lab",
            time: { start: 14, end: 16 },
            room: "-",
            teacher: { sortForm: "S.P/R.D", fullName: "Sujit Pathak / Rajdeep Das" },
        },
        {
            subject: "Applied Physics - 1",
            classType: "Lecture",
            time: { start: 16, end: 17 },
            room: "A-3",
            teacher: { sortForm: "S.P", fullName: "Sujit Pathak" },
        },
    ]
} as Record<Day, RoutingDetails[]>;


export const getTodaysRoutine = () => {
    const days: Day[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const dayName = days[today.getDay()] as Day;

    if (dayName === "Saturday" || dayName === "Sunday") {
        return [];
    }

    return routingDetails[dayName] || [];
}