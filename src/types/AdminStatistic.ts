export type AdminStatistic = {
    courseName: string;
    unitCount: number;
    users: {
        email: string;
        complitedUnitCount: number;
        firstName: string;
        lastName: string;
        id: string;
    }[];
}[];
