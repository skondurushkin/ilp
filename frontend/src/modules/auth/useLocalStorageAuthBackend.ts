import { GUEST, UserRole } from './User';

import { AuthBackend } from './AuthBackend';
import useLocalStorageState from 'use-local-storage-state';
import { useMemo } from 'react';

export const useLocalStorageAuthBackend = (): AuthBackend => {
    const [authData, setAuthData] = useLocalStorageState('auth-state', {
        defaultValue: { me: GUEST },
        storageSync: true,
    });

    const authActions = useMemo(
        () => ({
            signIn: (): Promise<void> => {
                setAuthData({
                    me: {
                        email: 'user',
                        roles: [UserRole.USER],
                    },
                });
                return Promise.resolve();
            },
            signOut: () => {
                setAuthData({ me: GUEST });
                return Promise.resolve();
            },
        }),
        [setAuthData],
    );

    return { authData, authActions };
};
