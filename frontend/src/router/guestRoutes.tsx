import { SignInPage } from '../pages';
import { TypedNavigate } from './components/TypedNavigate';

export const guestRoutes = [
    { path: '/sign-in', element: <SignInPage /> },
    { path: '*', element: <TypedNavigate to="/sign-in" /> },
] as const;
