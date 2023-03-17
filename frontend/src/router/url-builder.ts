import { RoutePath } from './AppRouter';

export type PathParams<P extends RoutePath> = ExtractRouteParams<P>;

type ExtractRouteParams<T> = string extends T
    ? Record<string, string>
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T extends `${infer _Start}:${infer Param}`
    ? { [k in Param]: string }
    : // eslint-disable-next-line @typescript-eslint/ban-types
      undefined;

export const buildUrl = <P extends RoutePath>(path: P, params: PathParams<P>): string => {
    let url = `${path}`;

    if (params) {
        const paramObj: { [i: string]: string } = params;
        for (const key of Object.keys(paramObj)) {
            url = url.replace(`:${key}`, paramObj[key]);
        }
    }

    return url;
};
