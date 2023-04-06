import { AuthUserRouteLayout } from '../components/AuthUserRouteLayout';
import React from 'react';

const ActivitiesAdminPage = React.lazy(() => import('../pages/ActivitiesAdminPage'));
const CreateActivityAdminPage = React.lazy(() => import('../pages/CreateActivityAdminPage'));
const CreateProductAdminPage = React.lazy(() => import('../pages/CreateProductAdminPage'));
const EditActivityAdminPage = React.lazy(() => import('../pages/EditActivityAdminPage'));
const EditProductAdminPage = React.lazy(() => import('../pages/EditProductAdminPage'));
const ProductsAdminPage = React.lazy(() => import('../pages/ProductsAdminPage'));
const WriteOffsAdminPage = React.lazy(() => import('../pages/WriteOffsAdminPage'));
const AdminStatisticPage = React.lazy(() => import('../pages/AdminStatisticPage'));

export const authAdminRoutes = [
    {
        path: '/admin',
        element: <AuthUserRouteLayout />,
        children: [
            {
                index: true,
                element: <AdminStatisticPage />,
            },
            {
                path: 'activities',
                index: true,
                element: <ActivitiesAdminPage />,
            },
            {
                path: 'activities/create',
                element: <CreateActivityAdminPage />,
            },
            {
                path: 'activities/edit/:activityId',
                element: <EditActivityAdminPage />,
            },
            {
                path: 'products',
                index: true,
                element: <ProductsAdminPage />,
            },
            {
                path: 'products/create',
                element: <CreateProductAdminPage />,
            },
            {
                path: 'products/edit/:productId',
                element: <EditProductAdminPage />,
            },
            {
                path: '/admin/write-offs',
                index: true,
                element: <WriteOffsAdminPage />,
            },
        ],
    },
];
