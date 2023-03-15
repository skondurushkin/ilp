import { createSearchParams, Navigate } from 'react-router-dom';
import { PathParams, RoutesPath } from '../../routes.types';
import type { NavigateProps } from 'react-router-dom';
import { buildUrl } from '../../routes.utils';

export const TypedNavigate = <P extends RoutesPath>({ to, params, search, ...props }: NavigatePropsAll<P>) => {
    return (
        <Navigate
            to={{
                pathname: buildUrl(to, params),
                search: typeof search === 'object' ? createSearchParams(search).toString() : search,
            }}
            {...props}
        />
    );
};

interface TypedNavigateProps<P extends RoutesPath> {
    to: P;
    params?: PathParams<P>;
    search?: string;
}

interface TypedNavigatePropsWithParam<P extends RoutesPath> {
    to: P;
    params: PathParams<P>;
    search?: string;
}

export type NavigatePropsAll<P extends RoutesPath> = P extends `${string}:${string}`
    ? TypedNavigatePropsWithParam<P> & NavigateProps
    : TypedNavigateProps<P> & NavigateProps;
