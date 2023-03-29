import { ERole } from '../../api';

export interface User {
    email: string;
    roles?: Set<ERole>;
}

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export const GUEST: User = { email: 'guest' };
