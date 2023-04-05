import { AuthUserRouteLayout } from '../components/AuthUserRouteLayout';
import { Navigate } from 'react-router-dom';
import React from 'react';

const MainPage = React.lazy(() => import('../pages/MainPage'));
const ProfilePage = React.lazy(() => import('../pages/ProfilePage'));
const ProductPage = React.lazy(() => import('../pages/ProductPage'));
const RulesPage = React.lazy(() => import('../pages/RulesPage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

export const authUserRoutes = [
    { path: '/sign-in', element: <Navigate to="/" /> },
    {
        path: '/',
        element: <AuthUserRouteLayout />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            { path: 'profile', element: <ProfilePage /> },
            { path: 'products/:id', element: <ProductPage /> },
            { path: 'rules', element: <RulesPage /> },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
];
