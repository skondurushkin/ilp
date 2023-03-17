import { SignIn } from '../pages';
import { TypedNavigate } from './components/TypedNavigate';

export const guestRoutes = [
    { path: '/sign-in', element: <SignIn /> },
    { path: '*', element: <TypedNavigate to="/sign-in" /> },
] as const;
