import { OperationResponseTypeEnum } from '../api';
import { ReactComponent as ZapSVG } from '../assets/zap.svg';

interface PriceTableCellProps {
    type?: OperationResponseTypeEnum;
    price: number;
}

export const PriceTableCell = (props: PriceTableCellProps) => {
    const { type, price } = props;

    return (
        <div className="flex items-center justify-between gap-2">
            {type ? (
                <p className="w-4 text-center text-base font-bold text-white">
                    {type === OperationResponseTypeEnum.Accrual ? '+' : '-'}
                </p>
            ) : (
                <div />
            )}
            <div className="flex items-center gap-2">
                <p className="text-base text-white">{price}</p>
                <ZapSVG />
            </div>
        </div>
    );
};
