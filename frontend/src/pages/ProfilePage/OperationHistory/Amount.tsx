import { ReactElement } from 'react';
import { ReactComponent as TokenIcon } from '../../../assets/token.svg';

export interface AmountProps {
    dir: '+' | '-';
    amount: number;
}

export function Amount(props: AmountProps): ReactElement {
    const { dir, amount } = props;

    return (
        <div className="flex w-32 items-center justify-end gap-1">
            <span className="font-bold">
                {dir}
                {amount}
            </span>
            <TokenIcon />
        </div>
    );
}
