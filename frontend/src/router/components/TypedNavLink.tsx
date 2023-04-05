import { LinkWithParamProps, buildUrl } from '../url-builder';
import { NavLink, createSearchParams } from 'react-router-dom';

import type { NavLinkProps } from 'react-router-dom';

export const TypedNavLink = (props: LinkWithParamProps & NavLinkProps) => {
    const { to, params, search, ...rest } = props;

    let searchStr: string | undefined;
    if (search) {
        searchStr = typeof search === 'string' ? search : createSearchParams(search).toString();
    }

    return <NavLink {...rest} to={{ pathname: buildUrl(to, params), search: searchStr }} />;
};
