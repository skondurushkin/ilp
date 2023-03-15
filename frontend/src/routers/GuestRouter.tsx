import { Route, Routes } from 'react-router-dom';
import { SignIn } from '../pages';
import { TypedNavigate } from './components/TypedNavigate';
import { TypedRoute } from './components/TypedRoute';

export const GuestRouter = () => {
    return (
        <Routes>
            <TypedRoute path="/sign-in" Component={SignIn} />
            <Route path="*" element={<TypedNavigate to="/sign-in" />} />
        </Routes>
    );
};
