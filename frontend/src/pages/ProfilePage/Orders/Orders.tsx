import { Chips } from '../../../components/Chips';
import { Grid } from '../../../components/Grid';
import { OrderCard } from './OrderCard';
import { ReactElement } from 'react';
import { range } from '../../../utils/range';
import { useOrdersQuery } from '../../../modules/loyalty';

export enum OrderType {
    Active = 'active',
    Archive = 'archive',
}

const orderTypes = [
    { label: 'текущие', value: OrderType.Active },
    { label: 'завершенные', value: OrderType.Archive },
] as const;

export interface OrdersProps {
    orderType: OrderType;
    onChangeOrderType: (type: OrderType) => void;
}

export function Orders(props: OrdersProps): ReactElement {
    const { orderType, onChangeOrderType } = props;

    const ordersQuery = useOrdersQuery();

    return (
        <div>
            <Chips options={orderTypes} value={orderType} onChange={onChangeOrderType} />
            <Grid className="mt-4 md:mt-8">
                {!ordersQuery.isSuccess && range(3).map((n) => <OrderCard key={n} skeleton />)}
                {ordersQuery.isSuccess && ordersQuery.data.map((order) => <OrderCard key={order.id} order={order} />)}
            </Grid>
        </div>
    );
}
