import { EmptyOperationHistory, OperationHistory } from './OperationHistory';
import { OrderType, Orders } from './Orders';

import { OperationResponseTypeEnum } from '../../api';
import { PageNav } from '../../components/AuthUserRouteLayout';
import { PageSection } from '../../components/PageSection';
import { WalletCard } from '../../components/WalletCard';
import { useScrollToHash } from '../../components/useScrollToHash';
import { useSearchParams } from 'react-router-dom';
import { useWalletQuery } from '../../modules/loyalty';

const HISTORY_TYPE_PARAM = {
    name: 'historyType',
    parse: (src: string | null): OperationResponseTypeEnum => {
        return src === OperationResponseTypeEnum.WriteOff
            ? OperationResponseTypeEnum.WriteOff
            : OperationResponseTypeEnum.Accrual;
    },
    stringify: (type: OperationResponseTypeEnum): string | undefined => {
        return type === OperationResponseTypeEnum.WriteOff ? OperationResponseTypeEnum.WriteOff : undefined;
    },
};

const ORDERS_TYPE_PARAM = {
    name: 'orderType',
    parse: (src: string | null): OrderType => {
        return src === OrderType.Archive ? OrderType.Archive : OrderType.Active;
    },
    stringify: (type: OrderType): string | undefined => {
        return type === OrderType.Archive ? OrderType.Archive : undefined;
    },
};

export const ProfilePage = () => {
    useScrollToHash();
    const walletQuery = useWalletQuery();
    const [operationType, changeOperationType] = useSearchParam(HISTORY_TYPE_PARAM);
    const [orderType, changeOrderType] = useSearchParam(ORDERS_TYPE_PARAM);

    return (
        <div>
            {walletQuery.isSuccess && walletQuery.data.operations.length > 0 && (
                <PageNav>
                    <ul className="flex items-center gap-4">
                        <li>
                            <a href="#balance">Мой баланс</a>
                        </li>
                        <li>
                            <a href="#balance-history">История баланса</a>
                        </li>
                        <li>
                            <a href="#orders">Мои заказы</a>
                        </li>
                    </ul>
                </PageNav>
            )}
            <PageSection id="balance">
                {walletQuery.status !== 'success' && <WalletCard skeleton />}
                {walletQuery.status === 'success' && <WalletCard wallet={walletQuery.data} />}
            </PageSection>
            {walletQuery.isSuccess && (
                <PageSection id="balance-history" className="mt-6 md:mt-10" caption="История баланса">
                    {walletQuery.isSuccess && walletQuery.data.operations.length === 0 && <EmptyOperationHistory />}
                    {walletQuery.isSuccess && walletQuery.data.operations.length > 0 && (
                        <OperationHistory operationType={operationType} onChangeOperationType={changeOperationType} />
                    )}
                </PageSection>
            )}
            {walletQuery.isSuccess && walletQuery.data.operations.length > 0 && (
                <PageSection id="orders" className="mt-6 md:mt-10" caption="Мои заказы">
                    <Orders orderType={orderType} onChangeOrderType={changeOrderType} />
                </PageSection>
            )}
        </div>
    );
};

interface SearParamDescriptor<T> {
    name: string;
    parse: (src: string | null) => T;
    stringify: (v: T) => string | undefined;
}

function useSearchParam<T>(param: SearParamDescriptor<T>): [T, (value: T) => void] {
    const [searchParams, setSearchParams] = useSearchParams();
    const value = param.parse(searchParams.get(param.name));

    const changeValue = (value: T) => {
        const paramValue = param.stringify(value);
        const newParams = new URLSearchParams(searchParams);
        if (paramValue === undefined) {
            newParams.delete(param.name);
        } else {
            newParams.set(param.name, paramValue);
        }
        setSearchParams(newParams);
    };

    return [value, changeValue];
}
