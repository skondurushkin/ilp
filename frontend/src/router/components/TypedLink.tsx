import { Link, createSearchParams } from 'react-router-dom';

import type { LinkProps } from 'react-router-dom';
import { RoutePath } from '../AppRouter';
import { TypedRouterComponentProps } from './TypedRouterComponent';
import { buildUrl } from '../url-builder';

export type TypedLinkProps<P extends RoutePath> = TypedRouterComponentProps<LinkProps, P>;

export const TypedLink = <P extends RoutePath>(props: TypedLinkProps<P>) => {
    const { to, params, search, ...rest } = props;

    let searchStr: string | undefined;
    if (search) {
        searchStr = typeof search === 'string' ? search : createSearchParams(search).toString();
    }

    return <Link {...rest} to={{ pathname: buildUrl(to, params), search: searchStr }} />;
};
