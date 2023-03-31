import { ReactElement, ReactNode } from 'react';

import { classnames } from '../utils/classnames';

export interface VerticalBracketsProps {
    className?: string;
    size?: '1' | '2' | '3' | '4';
    children?: ReactNode;
}

export function VerticalBrackets(props: VerticalBracketsProps): ReactElement {
    const { className, size = '1', children } = props;
    const topBracketClasses = classnames(
        "before:block before:w-full before:border-t before:border-l before:border-r before:border-gray before:content-['']",
        size === '1' && 'before:h-1',
        size === '2' && 'before:h-2',
        size === '3' && 'before:h-3',
        size === '4' && 'before:h-4',
    );
    const bottomBracketClasses = classnames(
        "after:block after:w-full after:border-b after:border-l after:border-r after:border-gray after:content-['']",
        size === '1' && 'after:h-1',
        size === '2' && 'after:h-2',
        size === '3' && 'after:h-3',
        size === '4' && 'after:h-4',
    );
    return (
        <div className={classnames('flex flex-col items-center', topBracketClasses, bottomBracketClasses, className)}>
            {children}
        </div>
    );
}
