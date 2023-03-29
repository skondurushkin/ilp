import { PathParams } from '../url-builder';
import { RoutePath } from '../AppRouter';
import type { URLSearchParamsInit } from 'react-router-dom';

export type TypedRouterComponentProps<T, P extends RoutePath> = P extends `${string}:${string}`
    ? TypedComponentPropsWithParam<P> & Omit<T, 'to'>
    : TypedComponentWithoutParamsProps<P> & Omit<T, 'to'>;

export interface TypedComponentWithoutParamsProps<P extends RoutePath> {
    to: P;
    params?: PathParams<P>;
    search?: URLSearchParamsInit | string;
}

export interface TypedComponentPropsWithParam<P extends RoutePath> {
    to: P;
    params: PathParams<P>;
    search?: URLSearchParamsInit | string;
}
