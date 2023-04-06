import { ReactElement, useState } from 'react';

import { Chips } from '../../components/Chips';
import { Grid } from '../../components/Grid';
import { OrderCard } from './OrderCard';
import { range } from '../../utils/range';
import { useOrdersQuery } from '../../modules/loyalty/orders';

export function Orders(): ReactElement {
    const [filter, setFilter] = useState<'active' | 'archive'>('active');

    const ordersQuery = useOrdersQuery();

    return (
        <div>
            <Chips
                options={
                    [
                        { label: 'Текущие', value: 'active' },
                        { label: 'Завершенные', value: 'archive' },
                    ] as const
                }
                value={filter}
                onChange={setFilter}
            />
            <Grid className="mt-4 md:mt-8">
                {!ordersQuery.isSuccess && range(3).map((n) => <OrderCard key={n} skeleton />)}
                {ordersQuery.isSuccess && ordersQuery.data.map((order) => <OrderCard key={order.id} order={order} />)}
            </Grid>
        </div>
    );
}
