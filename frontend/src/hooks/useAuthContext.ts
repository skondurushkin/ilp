import { useMemo } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { UserRole } from '../config/constants';

const initialData: {
    me: {
        role: UserRole | null;
    };
} = {
    me: {
        role: null,
    },
};

export const useAuthContext = () => {
    const [authData, setAuthData] = useLocalStorageState('auth-state', {
        defaultValue: initialData,
        storageSync: true,
    });

    const authContext = useMemo(
        () => ({
            signIn: (role = UserRole.USER) => {
                setAuthData({
                    me: {
                        role,
                    },
                });
            },
            signOut: () => {
                setAuthData(initialData);
            },
        }),
        [setAuthData],
    );

    return {
        authData,
        authContext,
        isAuthenticated: Boolean(authData.me.role),
    };
};
