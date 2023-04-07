import React, { useState } from 'react';
import { useQueryBalanceStatistic, useQueryUsersStatistic } from '../../modules/admin';

import type { AxisOptions } from 'react-charts';
import { BalanceStatisticResponseInnerDataInner } from '../../api';
import { Chart } from 'react-charts';
import { Chips } from '../../components/Chips';
import { Spinner } from '../../components/Spinner';
import { TopActivities } from './TopActivities';
import { TopProducts } from './TopProducts';
import { twMerge } from 'tailwind-merge';

type BalanceChip = 'day' | 'week' | 'month';
type UsersChip = 'day' | 'all';

export function AdminStatisticPage() {
    const [balanceChip, setBalanceChip] = useState<BalanceChip>('day');
    const [usersChip, setUsersChip] = useState<UsersChip>('day');
    const [focused, setFocused] = useState({
        activeSeriesIndex: -1,
        activeDatumIndex: -1,
    });

    const { data: balanceData, isLoading: isLoadingBalance } = useQueryBalanceStatistic({
        balancePeriodRequest: { period: balanceChip },
    });

    const { data: usersData, isLoading: isLoadingUsers } = useQueryUsersStatistic({
        usersPeriodRequest: { period: usersChip },
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
            getValue: (datum) => datum.date,
        }),
        [],
    );

    return (
        <div className="flex flex-col gap-8">
            <div className="text-h1">Статистика</div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 pl-2 ">
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
                    <a href="/" download className="ml-auto">
                        <button className={twMerge('chip h-6', 'chip-active')}>Скачать XML</button>
                    </a>
                </div>
                {isLoadingBalance && <Spinner />}
                <div className="bg-black">
                    <div className="text-h2 my-4 ml-8 text-white">Движение вольт по балансу пользователей</div>
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
                                        color: series.originalSeries.label === 'Начисления' ? '#AAE632' : '#F84E4E',
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
                    <div className="">
                        <div className="flex-column py-4 pl-6">
                            <div className="text-white">
                                <div className="bg-primary inline-block h-4 w-4 rounded-full" /> - Начисления
                            </div>
                            <div className="text-white">
                                <div className="bg-error inline-block h-4 w-4 rounded-full text-white" /> - Списания
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex gap-2 p-2">
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
                <TopProducts />
                <TopActivities />
                <div className="bg-black py-1">
                    <div className="text-h2 my-4 ml-8 text-white">Статистика входов посетителей</div>
                    {isLoadingUsers && <Spinner />}
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
                                        color: '#AAE632',
                                    }),
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
