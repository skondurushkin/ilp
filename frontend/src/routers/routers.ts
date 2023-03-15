import { RoutesPath } from './routes.types';

export const PATHS = [
    '/',
    '/sign-in',
    '/onboarding',
    '/dashboard',
    '/profile',
    '/post/:id',
    '/post/:id/comment/:commentid',
] as const;

export const ROUTES = PATHS.reduce(function (result, item) {
    result[item] = item;
    return result;
}, {} as Record<RoutesPath, string>);
