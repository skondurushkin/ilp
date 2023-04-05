import { Link, createSearchParams } from 'react-router-dom';
import { LinkWithParamProps, buildUrl } from '../url-builder';

import type { LinkProps } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export interface PresentationProps extends LinkProps {
    presentation?: 'link' | 'button';
    primary?: boolean;
}

export const TypedLink = (props: LinkWithParamProps & PresentationProps) => {
    const { to, params, search, presentation = 'link', primary, className, ...rest } = props;

    let searchStr: string | undefined;
    if (search) {
        searchStr = typeof search === 'string' ? search : createSearchParams(search).toString();
    }

    const classes = twMerge(
        presentation === 'link' && 'link',
        presentation === 'button' && 'btn',
        presentation === 'button' && primary && 'btn-primary',
        className,
    );

    return <Link {...rest} to={{ pathname: buildUrl(to, params), search: searchStr }} className={classes} />;
};
