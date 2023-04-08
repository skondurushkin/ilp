import { ReactElement, ReactNode } from 'react';

import { Box } from './Box';
import { ReactComponent as FrownIcon } from '../assets/frown.svg';
import { twMerge } from 'tailwind-merge';

export interface NoRowsProps {
    className?: string;
    children?: ReactNode;
}

export function NoRows(props: NoRowsProps): ReactElement {
    const { className, children } = props;
    return (
        <Box className={twMerge('text-gray items-center px-3 py-6 sm:py-8 md:py-12', className)}>
            <FrownIcon />
            <div className="text-small text-gray mt-4 md:mt-6">{children}</div>
        </Box>
    );
}
