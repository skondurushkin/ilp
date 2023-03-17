import { HTMLAttributeAnchorTarget } from 'react';
import type { RouteProps } from 'react-router-dom';
import { Link, createSearchParams } from 'react-router-dom';
import { RoutePath } from '../../AppRouter';
import { PathParams, buildUrl } from '../../url-builder';

export type LinkProps<P extends RoutePath> = P extends `${string}:${string}`
    ? TypedLinkPropsWithParams<P> & RouteProps
    : TypedLinkProps<P> & RouteProps;

export interface TypedLinkProps<P extends RoutePath> {
    to: P;
    params?: PathParams<P>;
    search?: string;
    redirect?: string;
    replace?: boolean;
    target?: HTMLAttributeAnchorTarget;
    className?: string;
    onClick?: () => void;
}

export interface TypedLinkPropsWithParams<P extends RoutePath> {
    to: P;
    params: PathParams<P>;
    search?: string;
    redirect?: string;
    replace?: boolean;
    target?: HTMLAttributeAnchorTarget;
    className?: string;
    onClick?: () => void;
}

export const TypedLink = <P extends RoutePath>({
    to,
    params,
    search,
    replace,
    target,
    children,
    className,
    onClick,
}: LinkProps<P>) => {
    return (
        <Link
            className={className}
            target={target}
            to={{
                pathname: buildUrl(to, params),
                search: typeof search === 'object' ? createSearchParams(search).toString() : search,
            }}
            replace={replace}
            onClick={onClick}
        >
            {children}
        </Link>
    );
};
