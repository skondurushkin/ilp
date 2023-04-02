import { ActivitiesAdminPage } from '../pages/ActivitiesAdminPage';
import { CreateActivityAdminPage } from '../pages/CreateActivityAdminPage';
import { CreateProductAdminPage } from '../pages/CreateProductAdminPage';
import { EditActivityAdminPage } from '../pages/EditActivityAdminPage';
import { EditProductAdminPage } from '../pages/EditProductAdminPage';
import { Layout } from '../components/Layout';
import { ProductsAdminPage } from '../pages/ProductsAdminPage';

export const authAdminRoutes = [
    {
        path: '/admin',
        element: <Layout>Admin page</Layout>,
        index: true,
    },
    {
        path: '/admin/activities',
        index: true,
        element: <ActivitiesAdminPage />,
    },
    {
        path: '/admin/activities/create',
        element: <CreateActivityAdminPage />,
    },
    {
        path: '/admin/activities/edit/:activityId',
        element: <EditActivityAdminPage />,
    },
    {
        path: '/admin/products',
        index: true,
        element: <ProductsAdminPage />,
    },
    {
        path: '/admin/products/create',
        element: <CreateProductAdminPage />,
    },
    {
        path: '/admin/products/edit/:productId',
        element: <EditProductAdminPage />,
    },
] as const;
