import { AuthUserRouteLayout } from '../components/AuthUserRouteLayout';
import MainPage from '../pages/MainPage';
import { Navigate } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import ProductPage from '../pages/ProductPage';
import ProfilePage from '../pages/ProfilePage';
import RulesPage from '../pages/RulesPage';

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
