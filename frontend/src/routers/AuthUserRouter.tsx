import { Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard, NotFound, Profile } from '../pages';
import { ROUTES } from './routers';

export const AuthUserRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={ROUTES['/dashboard']} replace />} />
            <Route path={ROUTES['/sign-in']} element={<Navigate to={ROUTES['/dashboard']} replace />} />
            <Route path={ROUTES['/dashboard']} Component={Dashboard} />
            <Route path={ROUTES['/profile']} Component={Profile} />
            <Route path="*" Component={NotFound} />
        </Routes>
    );
};
