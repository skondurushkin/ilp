import { Navigate, createSearchParams } from 'react-router-dom';

import type { NavigateProps } from 'react-router-dom';
import { RoutePath } from '../AppRouter';
import { TypedRouterComponentProps } from './TypedRouterComponent';
import { buildUrl } from '../url-builder';

export type TypedNavigateProps<P extends RoutePath> = TypedRouterComponentProps<NavigateProps, P>;

export const TypedNavigate = <P extends RoutePath>(props: TypedNavigateProps<P>) => {
    const { to, params, search, ...rest } = props;

    let searchStr: string | undefined;
    if (search) {
        searchStr = typeof search === 'string' ? search : createSearchParams(search).toString();
    }

    const target = { pathname: buildUrl(to, params), search: searchStr };
    return <Navigate {...rest} to={target} />;
};
