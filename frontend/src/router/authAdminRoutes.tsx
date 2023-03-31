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
            <Layout className="overflow-y-hidden overflow-x-scroll">
                <AdminProducts />
            </Layout>
        ),
    },
] as const;
