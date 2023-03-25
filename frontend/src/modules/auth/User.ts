export interface User {
    email: string;
    roles?: string[];
}

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export const GUEST: User = { email: 'guest' };
