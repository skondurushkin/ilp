import { AuthDataContext } from './AuthDataContext';
import { GuestRouter } from './GuestRouter';
import { AuthUserRouter } from './AuthUserRouter';
import { BrowserRouter } from 'react-router-dom';

import useLocalStorageState from 'use-local-storage-state';
import { UserRole } from '../config/constants';
import { ComponentType, useMemo } from 'react';
import { AuthActionsContext } from './AuthActionsContext';

const AUTH_DATA_DEFAULT_VALUE: {
    me: {
        role: UserRole | null;
    };
} = {
    me: {
        role: null,
    },
};

const routers: Record<UserRole, ComponentType> = {
    [UserRole.USER]: AuthUserRouter,
    [UserRole.ADMIN]: AuthUserRouter,
};

const AppRouter = () => {
    const [authData, setAuthData] = useLocalStorageState('auth-state', {
        defaultValue: AUTH_DATA_DEFAULT_VALUE,
        storageSync: true,
    });

    const authDataContext = {
        isAuthenticated: Boolean(authData.me.role),
        authData,
    };

    const authActionsContext = useMemo(
        () => ({
            signIn: (role: UserRole) => {
                setAuthData({
                    me: {
                        role,
                    },
                });
            },
            signOut: () => {
                setAuthData(AUTH_DATA_DEFAULT_VALUE);
            },
        }),
        [setAuthData],
    );

    const Router = authData.me.role ? routers[authData.me.role] : GuestRouter;

    return (
        <AuthDataContext.Provider value={authDataContext}>
            <AuthActionsContext.Provider value={authActionsContext}>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </AuthActionsContext.Provider>
        </AuthDataContext.Provider>
    );
};

export default AppRouter;
