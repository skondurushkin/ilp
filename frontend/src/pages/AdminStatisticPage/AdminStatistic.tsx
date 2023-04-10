import { BalancePeriodRequestPeriod, BalanceStatisticResponseInnerDataInner } from '../../api';
import React, { useMemo, useState } from 'react';
import { useQueryBalanceStatistic, useQueryUsersStatistic } from '../../modules/admin';

import type { AxisOptions } from 'react-charts';
import { Chart } from 'react-charts';
import { Chips } from '../../components/Chips';
import { DownloadBalanceCsvButton } from './DownloadCSV';
import { Spinner } from '../../components/Spinner';
import { TopActivities } from './TopActivities';
import { TopProducts } from './TopProducts';
import { UsersPeriodRequestPeriod } from '../../api/generated/models/UsersPeriodRequestPeriod';
import { colors } from '../../../colors';
import { createPeriod } from '../../utils/period';

type BalanceChip = 'day' | 'week' | 'month';
type UsersChip = 'day' | 'all';

export function AdminStatisticPage() {
    const [balanceChip, setBalanceChip] = useState<BalanceChip>('day');
    const [productsChip, setProductsChip] = useState<UsersChip>('day');
    const [activitiesChip, setActivitiesChip] = useState<UsersChip>('day');
    const [usersChip, setUsersChip] = useState<UsersChip>('day');
    const [focused, setFocused] = useState({
        activeSeriesIndex: -1,
        activeDatumIndex: -1,
    });

    const periodBalance: BalancePeriodRequestPeriod = useMemo(() => {
        const now = new Date();
        switch (balanceChip) {
            case 'day':
                return { ...createPeriod(now, '-day'), interval: 'hour' };
            case 'week':
                return { ...createPeriod(now, '-week'), interval: 'day' };
            default:
                return { ...createPeriod(now, '-month'), interval: 'day' };
        }
    }, [balanceChip]);

    const periodUsers: UsersPeriodRequestPeriod = useMemo(() => {
        const now = new Date();
        switch (usersChip) {
            case 'day':
                return { ...createPeriod(now, '-day'), interval: 'hour' };
            default:
                return { ...createPeriod(now, '-year'), interval: 'day' };
        }
    }, [usersChip]);

    const { data: balanceData, isLoading: isLoadingBalance } = useQueryBalanceStatistic({
        balancePeriodRequest: { period: periodBalance },
    });

    const { data: usersData, isLoading: isLoadingUsers } = useQueryUsersStatistic({
        usersPeriodRequest: { period: periodUsers },
    });

    const secondaryAxes = React.useMemo<AxisOptions<BalanceStatisticResponseInnerDataInner>[]>(
        () => [
            {
                getValue: (datum) => datum.count,
            },
        ],
        [],
    );

    const primaryAxis = React.useMemo<AxisOptions<BalanceStatisticResponseInnerDataInner>>(
        () => ({
            getValue: (datum) => new Date(datum.date),
        }),
        [],
    );

    const noData = <div className="text-h2 py-10 text-center text-white">Нет данных для отображения</div>;

    return (
        <div className="flex flex-col gap-8">
            <div className="text-h1">Статистика</div>
            <div className="flex flex-col gap-4">
                <div className="text-h2">Движение вольт по балансу пользователей</div>
                <div className="flex gap-2">
                    <Chips
                        options={
                            [
                                { label: 'день', value: 'day' },
                                { label: 'неделя', value: 'week' },
                                { label: 'месяц', value: 'month' },
                            ] as const
                        }
                        value={balanceChip}
                        onChange={setBalanceChip}
                    />
                    {<DownloadBalanceCsvButton />}
                </div>
                {isLoadingBalance && <Spinner />}
                <div className="bg-black">
                    {!balanceData && noData}
                    {balanceData && (
                        <div className="m-2 h-[40vh]">
                            <Chart
                                options={{
                                    data: balanceData,
                                    tooltip: false,
                                    primaryAxis,
                                    secondaryAxes,
                                    dark: true,
                                    getSeriesStyle: (series) => ({
                                        color:
                                            series.originalSeries.label === 'Начисления'
                                                ? colors.primary
                                                : colors.error,
                                        opacity:
                                            focused.activeSeriesIndex > -1
                                                ? series.index === focused.activeSeriesIndex
                                                    ? 1
                                                    : 0.3
                                                : 1,
                                    }),
                                    onFocusDatum: (focused) =>
                                        setFocused({
                                            activeSeriesIndex: focused ? focused.seriesIndex : -1,
                                            activeDatumIndex: focused ? focused.index : -1,
                                        }),
                                }}
                            />
                        </div>
                    )}
                    <div>
                        <div className="flex-column py-4 pl-6">
                            <div className="flex items-center gap-3 text-white">
                                <div className="bg-primary inline-block h-4 w-4 rounded-full" />
                                начисления
                            </div>
                            <div className="flex items-center gap-3 text-white">
                                <div className="bg-error inline-block h-4 w-4 rounded-full text-white" />
                                списания
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <div className="text-h2">Топ товаров</div>
                    <div className="flex gap-2 p-2 pl-0">
                        <Chips
                            options={
                                [
                                    { value: 'day', label: 'день' },
                                    { value: 'all', label: 'всё время' },
                                ] as const
                            }
                            value={productsChip}
                            onChange={setProductsChip}
                        />
                    </div>
                    <TopProducts period={productsChip} />
                </div>
                <div>
                    <div className="text-h2">Топ активностей</div>
                    <div className="flex gap-2 p-2 pl-0">
                        <Chips
                            options={
                                [
                                    { value: 'day', label: 'день' },
                                    { value: 'all', label: 'всё время' },
                                ] as const
                            }
                            value={activitiesChip}
                            onChange={setActivitiesChip}
                        />
                    </div>
                    <TopActivities period={activitiesChip} />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-h2">Статистика входов посетителей</div>
                    <div className="flex gap-2 p-2 pl-0">
                        <Chips
                            options={
                                [
                                    { value: 'day', label: 'день' },
                                    { value: 'all', label: 'всё время' },
                                ] as const
                            }
                            value={usersChip}
                            onChange={setUsersChip}
                        />
                    </div>
                    <div className="bg-black py-1">
                        {isLoadingUsers && <Spinner />}
                        {!usersData && noData}
                        {usersData && (
                            <div className="m-2 h-[40vh]">
                                <Chart
                                    options={{
                                        data: [usersData],
                                        primaryAxis,
                                        secondaryAxes,
                                        dark: true,
                                        tooltip: false,
                                        getSeriesStyle: () => ({
                                            color: colors.primary,
                                        }),
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
