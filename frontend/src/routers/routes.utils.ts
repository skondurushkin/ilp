import { PathParams, RoutesPath } from './routes.types';

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
