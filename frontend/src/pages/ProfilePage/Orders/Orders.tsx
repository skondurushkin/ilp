import { Chips } from '../../../components/Chips';
import { Grid } from '../../../components/Grid';
import { NoRows } from '../../../components/NoRows';
import { OrderCard } from './OrderCard';
import { ReactElement } from 'react';
import { WriteOffStatus } from '../../../api';
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

    const statuses: WriteOffStatus[] =
        orderType === OrderType.Active
            ? [WriteOffStatus.Created, WriteOffStatus.Processing, WriteOffStatus.Delivering]
            : [WriteOffStatus.Completed, WriteOffStatus.Cancelled];
    const ordersQuery = useOrdersQuery(statuses);

    return (
        <div>
            <Chips options={orderTypes} value={orderType} onChange={onChangeOrderType} />
            {!ordersQuery.isSuccess && (
                <Grid className="mt-4 md:mt-8">
                    {range(3).map((n) => (
                        <OrderCard key={n} skeleton />
                    ))}
                </Grid>
            )}
            {ordersQuery.isSuccess && ordersQuery.data.length > 0 && (
                <Grid className="mt-4 md:mt-8">
                    {ordersQuery.data.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </Grid>
            )}
            {ordersQuery.isSuccess && ordersQuery.data.length === 0 && (
                <NoRows className="mt-4 md:mt-8">
                    {orderType === OrderType.Active && <div>Нет текущих заказов</div>}
                    {orderType === OrderType.Archive && <div>Нет завершенных заказов</div>}
                </NoRows>
            )}
        </div>
    );
}
