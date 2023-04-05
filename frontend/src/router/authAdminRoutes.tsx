import { AuthUserRouteLayout } from '../components/AuthUserRouteLayout';
import { Link } from 'react-router-dom';
import React from 'react';

const ActivitiesAdminPage = React.lazy(() => import('../pages/ActivitiesAdminPage'));
const CreateActivityAdminPage = React.lazy(() => import('../pages/CreateActivityAdminPage'));
const CreateProductAdminPage = React.lazy(() => import('../pages/CreateProductAdminPage'));
const EditActivityAdminPage = React.lazy(() => import('../pages/EditActivityAdminPage'));
const EditProductAdminPage = React.lazy(() => import('../pages/EditProductAdminPage'));
const ProductsAdminPage = React.lazy(() => import('../pages/ProductsAdminPage'));
const WriteOffsAdminPage = React.lazy(() => import('../pages/WriteOffsAdminPage'));

export const authAdminRoutes = [
    {
        path: '/admin',
        element: <AuthUserRouteLayout />,
        children: [
            {
                index: true,
                element: (
                    <div className="flex flex-col gap-2">
                        <Link to="/admin/activities">activities</Link>
                        <Link to="/admin/activities/create">activities create</Link>
                    </div>
                ),
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
