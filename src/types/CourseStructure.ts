export type CourseStructure = {
    title: string;
    courseId: number;
    description: string;
    image: string;
    subItems: {
        id: number;
        title: string;
        units: {
            id: number;
            title: string;
            type: string;
        }[];
    }[];
};
