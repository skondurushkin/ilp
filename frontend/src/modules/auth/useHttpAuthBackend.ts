import { GUEST, User } from './User';

import { AuthBackend } from './AuthBackend';
import { ERR_UNAUTHORIZED } from './auth-errors';
import { api } from '../../api';
import useLocalStorageState from 'use-local-storage-state';
import { useMemo } from 'react';
import { useQueryClient } from 'react-query';

interface StoredUser extends User {
    token: string;
    refreshToken: string;
}

const STORAGE_KEY = 'auth-state';

export function removeAuthFromLocalStorage(): void {
    localStorage.removeItem(STORAGE_KEY);
}

export function restoreAuthFromLocalStorage(): void {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == undefined) {
        return;
    }
    const user = JSON.parse(raw) as StoredUser;
    api.setAuthToken(user.token);
}

export const useHttpAuthBackend = (): AuthBackend => {
    const queryClient = useQueryClient();

    const [storedUser, setStoredUser, { removeItem }] = useLocalStorageState<StoredUser | undefined>(STORAGE_KEY, {
        storageSync: true,
    });

    const authData = useMemo(
        () => (storedUser ? { me: { email: storedUser.email, roles: storedUser.roles } } : { me: GUEST }),
        [storedUser],
    );

    const authActions = useMemo(
        () => ({
            signIn: (email: string, password: string): Promise<void> => {
                return api.auth
                    .authenticateUser({ loginRequest: { email, password } })
                    .then((res) => {
                        const { token, refreshToken, email, roles } = res;

                        api.setAuthToken(token);
                        setStoredUser({
                            email,
                            roles: Array.from(roles),
                            token,
                            refreshToken,
                        });
                    })
                    .catch((err) => {
                        console.error('failed to authenticate user', err);
                        if ('status' in err && typeof err.status === 'number' && err.status === 401) {
                            return Promise.reject(ERR_UNAUTHORIZED);
                        }
                        return Promise.reject(err);
                    });
            },
            signOut: () => {
                return api.auth
                    .logoutUser()
                    .then(() => {
                        api.setAuthToken(undefined);
                        removeItem();
                        queryClient.clear();
                    })
                    .catch((err) => {
                        console.error('failed to logout user', err);
                    });
            },
        }),
        [setStoredUser],
    );

    return { authData, authActions };
};
