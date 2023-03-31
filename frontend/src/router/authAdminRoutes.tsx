import { AdminProducts } from '../pages/AdminProducts';
import { Layout } from '../components/Layout';

export const authAdminRoutes = [
    {
        path: '/admin',
        element: <Layout>Admin page</Layout>,
        index: true,
    },
    {
        path: '/admin/products',
        element: (
            <Layout>
                <AdminProducts />
            </Layout>
        ),
    },
] as const;
