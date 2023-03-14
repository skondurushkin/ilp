import { HTMLAttributeAnchorTarget } from 'react';
import { Link, createSearchParams } from 'react-router-dom';
import { buildUrl, PathParams, RoutesPath } from '../..';

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
            onClick={onClick}>
            {children}
        </Link>
    );
};

interface TypedLinkProps<P extends RoutesPath> extends RouteProps {
    to: P;
    params?: PathParams<P>;
    search?: string;
    redirect?: string;
    replace?: boolean;
    target?: HTMLAttributeAnchorTarget;
    className?: string;
    onClick?: () => void;
}

interface TypedLinkPropsWithParams<P extends RoutesPath> extends RouteProps {
    to: P;
    params: PathParams<P>;
    search?: string;
    redirect?: string;
    replace?: boolean;
    target?: HTMLAttributeAnchorTarget;
    className?: string;
    onClick?: () => void;
}

export interface RouteProps {
    caseSensitive?: boolean;
    children?: React.ReactNode;
    element?: React.ReactElement | null;
    index?: boolean;
    path?: string;
}

export type LinkProps<P extends RoutesPath> = P extends `${string}:${string}`
    ? TypedLinkPropsWithParams<P>
    : TypedLinkProps<P>;
