import { Link, createSearchParams } from 'react-router-dom';
import type { LinkProps, URLSearchParamsInit } from 'react-router-dom';

import { twMerge } from 'tailwind-merge';

export interface RouterLinkProps extends LinkProps {
    to: string;
    params?: Record<string, string>;
    search?: URLSearchParamsInit | string;
    hash?: string;
    presentation?: 'link' | 'button';
    primary?: boolean;
}

export const RouterLink = (props: RouterLinkProps) => {
    const { to, params, search, hash, presentation = 'link', primary, className, ...rest } = props;

    let searchStr: string | undefined;
    if (search) {
        searchStr = typeof search === 'string' ? search : createSearchParams(search).toString();
    }

    const classes = twMerge(
        presentation === 'link' && 'link',
        presentation === 'button' && 'btn',
        presentation === 'button' && primary && 'btn-primary',
        className,
    );

    return <Link {...rest} to={{ pathname: buildUrl(to, params), search: searchStr, hash }} className={classes} />;
};

const buildUrl = (path: string, params?: Record<string, string>): string => {
    let url = `${path}`;

    if (params) {
        const paramObj: { [i: string]: string } = params;
        for (const key of Object.keys(paramObj)) {
            url = url.replace(`:${key}`, paramObj[key]);
        }
    }

    return url;
};
