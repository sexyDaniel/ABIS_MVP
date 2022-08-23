export type CourseStructure = {
    title: string;
    courseId: number;
    description: string;
    isUserInCourse?: boolean;
    image: string;
    subItems: SubItemStructure[];
};

export type SubItemStructure = {
    id: number;
    title: string;
    description?: string;
    units: UnitStructure[];
};

export type UnitStructure = {
    id: number;
    title: string;
    type: 'Theory' | 'Test';
    isComplete?: boolean;
};
