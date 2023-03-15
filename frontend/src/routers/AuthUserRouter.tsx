import { Route, Routes } from 'react-router-dom';
import { Dashboard, NotFound, Profile } from '../pages';
import { TypedNavigate } from './components/TypedNavigate';
import { TypedRoute } from './components/TypedRoute';

export const AuthUserRouter = () => {
    return (
        <Routes>
            <TypedRoute path="/" element={<TypedNavigate to="/dashboard" replace />} />
            <TypedRoute path="/sign-in" element={<TypedNavigate to="/dashboard" replace />} />
            <TypedRoute path="/dashboard" Component={Dashboard} />
            <TypedRoute path="/profile" Component={Profile} />
            <Route path="*" Component={NotFound} />
        </Routes>
    );
};
