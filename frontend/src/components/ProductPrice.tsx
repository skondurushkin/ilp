import { ReactElement } from 'react';
import { ReactComponent as TokenIcon } from '../assets/token.svg';
import { twMerge } from 'tailwind-merge';

export interface ProductPriceProps {
    className?: string;
    price: number;
    themed?: boolean;
}

export function ProductPrice(props: ProductPriceProps): ReactElement {
    const { className, price, themed } = props;
    return (
        <div
            className={twMerge(
                'flex items-center gap-1 self-center rounded-lg py-1 px-2 text-xl md:text-2xl',
                themed ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black',
                className,
            )}
        >
            {price}
            <TokenIcon />
        </div>
    );
}
