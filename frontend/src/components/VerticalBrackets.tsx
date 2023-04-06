import { ReactElement, ReactNode } from 'react';

import { Color } from '../../colors';
import { twMerge } from 'tailwind-merge';

export interface VerticalBracketsProps {
    className?: string;
    size?: '1' | '2' | '3' | '4';
    children?: ReactNode;
    color?: Color;
}

type TopBracketColor = `before:border-${Color}`;

const topBracketColor: Record<Color, TopBracketColor> = {
    black: 'before:border-black',
    white: 'before:border-white',
    primary: 'before:border-primary',
    gray: 'before:border-gray',
    'secondary-green': 'before:border-secondary-green',
    'gray-dark': 'before:border-gray-dark',
    error: 'before:border-error',
    success: 'before:border-success',
    transparent: 'before:border-transparent',
    'white-transparent': 'before:border-white-transparent',
    'black-transparent': 'before:border-black-transparent',
};

type BottomBracketColor = `after:border-${Color}`;

const bottomBracketColor: Record<Color, BottomBracketColor> = {
    black: 'after:border-black',
    white: 'after:border-white',
    primary: 'after:border-primary',
    gray: 'after:border-gray',
    'secondary-green': 'after:border-secondary-green',
    'gray-dark': 'after:border-gray-dark',
    error: 'after:border-error',
    success: 'after:border-success',
    transparent: 'after:border-transparent',
    'white-transparent': 'after:border-white-transparent',
    'black-transparent': 'after:border-black-transparent',
};

export function VerticalBrackets(props: VerticalBracketsProps): ReactElement {
    const { className, size = '1', color = 'gray', children } = props;
    const topBracketClasses = twMerge(
        "before:block before:w-full before:border-t before:border-l before:border-r before:content-['']",
        topBracketColor[color],
        size === '1' && 'before:h-1',
        size === '2' && 'before:h-2',
        size === '3' && 'before:h-3',
        size === '4' && 'before:h-4',
    );
    const bottomBracketClasses = twMerge(
        "after:block after:w-full after:border-b after:border-l after:border-r after:content-['']",
        bottomBracketColor[color],
        size === '1' && 'after:h-1',
        size === '2' && 'after:h-2',
        size === '3' && 'after:h-3',
        size === '4' && 'after:h-4',
    );
    return (
        <div className={twMerge('flex flex-col items-center', topBracketClasses, bottomBracketClasses, className)}>
            {children}
        </div>
    );
}
