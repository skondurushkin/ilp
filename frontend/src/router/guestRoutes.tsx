import { Navigate } from 'react-router-dom';
import React from 'react';
import SignInPage from '../pages/SignInPage';

export const guestRoutes = [
    { path: '/sign-in', element: <SignInPage /> },
    { path: '*', element: <Navigate to="/sign-in" /> },
];
