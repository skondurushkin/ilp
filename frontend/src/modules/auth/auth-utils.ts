import { AuthData } from './AuthContext';

export function isAuthenticated(auth: AuthData): boolean {
    return auth.me.roles ? auth.me.roles.length > 0 : false;
}

export function hasRole(auth: AuthData, role: string): boolean {
    if (!auth.me.roles) {
        return false;
    }
    return auth.me.roles.indexOf(role) >= 0;
}
