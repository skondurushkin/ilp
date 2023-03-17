import { createSearchParams, Navigate } from 'react-router-dom';
import type { NavigateProps } from 'react-router-dom';
import { RoutePath } from '../../AppRouter';
import { PathParams, buildUrl } from '../../url-builder';

export type NavigatePropsAll<P extends RoutePath> = P extends `${string}:${string}`
    ? TypedNavigatePropsWithParam<P> & NavigateProps
    : TypedNavigateProps<P> & NavigateProps;

export interface TypedNavigateProps<P extends RoutePath> {
    to: P;
    params?: PathParams<P>;
    search?: string;
}

export interface TypedNavigatePropsWithParam<P extends RoutePath> {
    to: P;
    params: PathParams<P>;
    search?: string;
}

export const TypedNavigate = <P extends RoutePath>({ to, params, search, ...props }: NavigatePropsAll<P>) => {
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
