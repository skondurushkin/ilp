import { HTMLAttributeAnchorTarget } from 'react';
import { Link, createSearchParams } from 'react-router-dom';
import { PathParams, RoutesPath } from '../../routes.types';
import { buildUrl } from '../../routes.utils';
import type { RouteProps } from 'react-router-dom';

export const TypedLink = <P extends RoutesPath>({
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

interface TypedLinkProps<P extends RoutesPath> {
    to: P;
    params?: PathParams<P>;
    search?: string;
    redirect?: string;
    replace?: boolean;
    target?: HTMLAttributeAnchorTarget;
    className?: string;
    onClick?: () => void;
}

interface TypedLinkPropsWithParams<P extends RoutesPath> {
    to: P;
    params: PathParams<P>;
    search?: string;
    redirect?: string;
    replace?: boolean;
    target?: HTMLAttributeAnchorTarget;
    className?: string;
    onClick?: () => void;
}

export type LinkProps<P extends RoutesPath> = P extends `${string}:${string}`
    ? TypedLinkPropsWithParams<P> & RouteProps
    : TypedLinkProps<P> & RouteProps;
