import { ReactElement, ReactNode } from 'react';

import { classnames } from '../utils/classnames';

export interface BoxProps {
    className?: string;
    children?: ReactNode;
}

export function Box(props: BoxProps): ReactElement {
    const { className, children } = props;

    return (
        <div className={classnames('flex flex-col bg-gray-dark px-4 pb-6 pt-4 text-white dark:bg-black', className)}>
            {children}
        </div>
    );
}
