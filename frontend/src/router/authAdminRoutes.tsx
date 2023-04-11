import ActivitiesAdminPage from '../pages/ActivitiesAdminPage';
import AdminStatisticPage from '../pages/AdminStatisticPage';
import { AuthUserRouteLayout } from '../components/AuthUserRouteLayout';
import CreateActivityAdminPage from '../pages/CreateActivityAdminPage';
import CreateProductAdminPage from '../pages/CreateProductAdminPage';
import EditActivityAdminPage from '../pages/EditActivityAdminPage';
import EditProductAdminPage from '../pages/EditProductAdminPage';
import ProductsAdminPage from '../pages/ProductsAdminPage';
import UserAdminPage from '../pages/UserAdminPage';
import UsersAdminPage from '../pages/UsersAdminPage';
import WriteOffsAdminPage from '../pages/WriteOffsAdminPage';

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
                path: 'write-offs',
                index: true,
                element: <WriteOffsAdminPage />,
            },
            {
                path: 'users',
                index: true,
                element: <UsersAdminPage />,
            },
            {
                path: 'users/:userId',
                index: true,
                element: <UserAdminPage />,
            },
        ],
    },
];
