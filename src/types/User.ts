import { Role } from './Role';

export type User = {
    id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role | 'User' | 'Admin' | 'SuperAdmin';
};
