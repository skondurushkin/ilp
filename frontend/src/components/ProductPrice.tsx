import { ReactElement } from 'react';
import { Zaps } from './Zaps';
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
                'self-center rounded-lg px-2 py-1',
                themed ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black',
                className,
            )}
        >
            <Zaps className="text-h2" zapClassName="h-6 w-6" amount={price} />
        </div>
    );
}
