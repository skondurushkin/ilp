import { useMemo } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { AuthActions } from './AuthActionsContext';
import { Auth } from './AuthContext';
import { UserRole, GUEST } from './User';

export interface AuthBackend {
    auth: Auth;
    authActions: AuthActions;
}

export const useLocalStorageAuthBackend = (): AuthBackend => {
    const [authData, setAuthData] = useLocalStorageState('auth-state', {
        defaultValue: { me: GUEST },
        storageSync: true,
    });

    const auth = {
        authData,
        isAuthenticated: Boolean(authData.me.role),
    };

    const authActions = useMemo(
        () => ({
            signIn: (role: UserRole) => {
                setAuthData({
                    me: {
                        role,
                    },
                });
            },
            signOut: () => {
                setAuthData({ me: GUEST });
            },
        }),
        [setAuthData],
    );

    return { auth, authActions };
};
