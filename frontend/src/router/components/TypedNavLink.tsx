import { NavLink, createSearchParams } from 'react-router-dom';

import type { NavLinkProps } from 'react-router-dom';
import { RoutePath } from '../AppRouter';
import { TypedRouterComponentProps } from './TypedRouterComponent';
import { buildUrl } from '../url-builder';

export type TypedNavLinkProps<P extends RoutePath> = TypedRouterComponentProps<NavLinkProps, P>;

export const TypedNavLink = <P extends RoutePath>(props: TypedNavLinkProps<P>) => {
    const { to, params, search, ...rest } = props;

    let searchStr: string | undefined;
    if (search) {
        searchStr = typeof search === 'string' ? search : createSearchParams(search).toString();
    }

    return <NavLink {...rest} to={{ pathname: buildUrl(to, params), search: searchStr }} />;
};
