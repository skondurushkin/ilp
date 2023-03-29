import { AuthData } from './AuthContext';
import { ERole } from '../../api';

export function isAuthenticated(auth: AuthData): boolean {
    return auth.me.roles ? auth.me.roles.size > 0 : false;
}

export function hasRole(auth: AuthData, role: ERole): boolean {
    if (!auth.me.roles) {
        return false;
    }
    return auth.me.roles.has(role);
}
