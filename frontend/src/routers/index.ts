/*
 * Inspired by
 * https://dev.to/0916dhkim/type-safe-usage-of-react-router-5c44
 */
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

export type ExtractRouteParams<T> = string extends T
    ? Record<string, string>
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T extends `${infer _Start}:${infer Param}`
    ? { [k in Param]: string }
    : // eslint-disable-next-line @typescript-eslint/ban-types
      undefined;

export type RoutesPath = (typeof PATHS)[number];

export type PathParams<P extends RoutesPath> = ExtractRouteParams<P>;

export const buildUrl = <P extends RoutesPath>(path: P, params: PathParams<P>): string => {
    let url = `${path}`;

    if (params) {
        const paramObj: { [i: string]: string } = params;
        for (const key of Object.keys(paramObj)) {
            url = url.replace(`:${key}`, paramObj[key]);
        }
    }

    return url;
};
