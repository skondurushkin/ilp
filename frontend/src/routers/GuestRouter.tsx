import { Route, Routes, Navigate } from 'react-router-dom';
import { SignIn } from '../pages';
import { ROUTES } from './routers';

export const GuestRouter = () => {
    return (
        <Routes>
            <Route path={ROUTES['/sign-in']} Component={SignIn} />
            <Route
                path="*"
                element={
                    <Navigate
                        to={{
                            pathname: ROUTES['/sign-in'],
                        }}
                    />
                }
            />
        </Routes>
    );
};
