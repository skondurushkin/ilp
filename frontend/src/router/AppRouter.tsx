import { ReactElement } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { UserRole, AuthContext, AuthActionsContext, useLocalStorageAuthBackend } from '../modules/auth';
import { guestRoutes } from './guestRoutes';
import { authUserRoutes } from './authUserRoutes';

const guestRouter = <RouterProvider router={createBrowserRouter([...guestRoutes])} />;

const routers: Record<UserRole, ReactElement> = {
    [UserRole.USER]: <RouterProvider router={createBrowserRouter([...authUserRoutes])} />,
    [UserRole.ADMIN]: <RouterProvider router={createBrowserRouter([...authUserRoutes])} />,
};

export const AppRouter = () => {
    const { auth, authActions } = useLocalStorageAuthBackend();

    const router = auth.authData.me.role ? routers[auth.authData.me.role] : guestRouter;

    return (
        <AuthContext.Provider value={auth}>
            <AuthActionsContext.Provider value={authActions}>{router}</AuthActionsContext.Provider>
        </AuthContext.Provider>
    );
};

export type RoutePath = InferRoutesPaths<typeof guestRoutes> | InferRoutesPaths<typeof authUserRoutes>;

type InferRoutesPaths<T> = T extends ReadonlyArray<infer Route>
    ? Route extends { path: infer Path }
        ? Path extends string
            ? Path extends '*'
                ? never
                : Path | WithPrefix<InferChildrenPaths<Route>, Path>
            : never
        : never
    : never;

type InferChildrenPaths<T> = T extends { children: infer Children }
    ? Children extends ReadonlyArray<infer Route>
        ? Route extends { path: infer Path }
            ? Path extends string
                ? Path extends '*'
                    ? never
                    : Path | InferRoutesPaths<Children>
                : never
            : never
        : never
    : never;

type WithPrefix<T extends string, Prefix extends string> = `${Prefix}/${T}`;
