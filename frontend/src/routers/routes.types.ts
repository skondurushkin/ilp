import { PATHS } from './routers';

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
