import { GUEST, User } from './User';
import { useEffect, useMemo } from 'react';

import { AuthBackend } from './AuthBackend';
import { ERR_UNAUTHORIZED } from './auth-errors';
import { api } from '../../api';
import useLocalStorageState from 'use-local-storage-state';

interface StoredUser extends User {
    token: string;
    refreshToken: string;
}

export const useHttpAuthBackend = (): AuthBackend => {
    const [storedUser, setStoredUser] = useLocalStorageState<StoredUser | undefined>('auth-state', {
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

                        setStoredUser({
                            email,
                            roles,
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
                        setStoredUser(undefined);
                    })
                    .catch((err) => {
                        console.error('failed to logout user', err);
                    });
            },
        }),
        [setStoredUser],
    );

    useEffect(() => {
        api.setAuthToken(storedUser !== undefined ? storedUser.token : undefined);
    }, [storedUser]);

    return { authData, authActions };
};
