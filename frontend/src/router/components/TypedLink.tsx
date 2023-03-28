import { Link, createSearchParams } from 'react-router-dom';

import type { LinkProps } from 'react-router-dom';
import { RoutePath } from '../AppRouter';
import { TypedRouterComponentProps } from './TypedRouterComponent';
import { buildUrl } from '../url-builder';
import { classnames } from '../../utils/classnames';

export type TypedLinkProps<P extends RoutePath> = TypedRouterComponentProps<LinkProps, P> & PresentationProps;

export interface PresentationProps {
    presentation?: 'link' | 'button';
    primary?: boolean;
}

export const TypedLink = <P extends RoutePath>(props: TypedLinkProps<P>) => {
    const { to, params, search, presentation = 'link', primary, className, ...rest } = props;

    let searchStr: string | undefined;
    if (search) {
        searchStr = typeof search === 'string' ? search : createSearchParams(search).toString();
    }

    const classes = classnames(
        presentation === 'button' && 'btn',
        presentation === 'button' && primary && 'btn-primary',
        className,
    );

    return <Link {...rest} to={{ pathname: buildUrl(to, params), search: searchStr }} className={classes} />;
};
