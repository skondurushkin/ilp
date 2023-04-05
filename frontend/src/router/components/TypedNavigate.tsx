import { LinkWithParamProps, buildUrl } from '../url-builder';
import { Navigate, createSearchParams } from 'react-router-dom';

export const TypedNavigate = (props: LinkWithParamProps) => {
    const { to, params, search, ...rest } = props;

    let searchStr: string | undefined;
    if (search) {
        searchStr = typeof search === 'string' ? search : createSearchParams(search).toString();
    }

    const target = { pathname: buildUrl(to, params), search: searchStr };
    return <Navigate {...rest} to={target} />;
};
