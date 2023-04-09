import { OperationResponseTypeEnum } from '../api';
import { ReactElement } from 'react';
import { ReactComponent as ZapIcon } from '../assets/zap.svg';
import { range } from '../utils/range';
import { twMerge } from 'tailwind-merge';

export interface ZapsProps {
    amount: number;
    className?: string;
    // для изменения размеров иконки
    zapClassName?: string;
    // добавляет '+' или '-', если задан
    type?: OperationResponseTypeEnum;
    // длинна до которой нужно дополнить amount пробелами, если указано то будет установлен шрифт monospace
    length?: number;
}

export function Zaps(props: ZapsProps): ReactElement {
    const { className, zapClassName, type, amount, length } = props;
    const sign = type === undefined ? '' : type === OperationResponseTypeEnum.Accrual ? '+' : '-';
    let str: string;
    if (length === undefined) {
        str = `${sign}${amount}`;
    } else {
        str = normalizeAmount(sign, amount, length);
    }
    return (
        <span className={twMerge('inline-flex items-center gap-1', length !== undefined && 'font-mono', className)}>
            {str}
            <ZapIcon className={twMerge('inline-block h-3 w-3', zapClassName)} />
        </span>
    );
}

function normalizeAmount(dir: string, amount: number, length: number): string {
    const prefix = range(length - amount.toString().length)
        .map(() => '\u00A0')
        .join('');
    return `${prefix}${dir}${amount}`;
}
