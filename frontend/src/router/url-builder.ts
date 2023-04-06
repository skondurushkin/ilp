import type { URLSearchParamsInit } from 'react-router-dom';

export type RouteParams = Record<string, string> | undefined;

export interface LinkWithParamProps {
    to: string;
    params?: RouteParams;
    search?: URLSearchParamsInit | string;
    hash?: string;
}

export const buildUrl = (path: string, params: RouteParams): string => {
    let url = `${path}`;

    if (params) {
        const paramObj: { [i: string]: string } = params;
        for (const key of Object.keys(paramObj)) {
            url = url.replace(`:${key}`, paramObj[key]);
        }
    }

    return url;
};
