import { AdminProducts } from '../pages/AdminProducts';

export const authAdminRoutes = [
    {
        path: '/admin',
        element: <div>Администрирование - dashboard</div>,
        index: true,
    },
    {
        path: '/admin/products',
        element: <AdminProducts />,
    },
] as const;
