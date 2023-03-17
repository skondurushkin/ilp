export interface User {
    role: UserRole | null;
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export const GUEST: User = {
    role: null,
};
