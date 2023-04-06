import React, { useState } from 'react';
import { useQueryBalanceStatistic, useQueryUsersStatistic } from '../../modules/admin';

// eslint-disable-next-line import/no-unresolved
import { AxisOptions } from 'react-charts/types/types';
import { BalanceStatisticResponseInnerDataInner } from '../../api';
import { Chart } from 'react-charts';
import { Spinner } from '../../components/Spinner';
import { TopActivities } from './TopActivities';
import { TopProducts } from './TopProducts';
import { twMerge } from 'tailwind-merge';
import { useTheme } from '../../theme';

const DAY = 'day';
const WEEK = 'week';
const MONTH = 'month';
const ALL_TIME = 'all';

type BalanceChip = 'day' | 'week' | 'month';
type UsersChip = 'day' | 'all';

export function AdminStatisticPage() {
    const [balanceChip, setBalanceChip] = useState<BalanceChip>('day');
    const [usersChip, setUsersChip] = useState<UsersChip>('day');
    const [focused, setFocused] = useState({
        activeSeriesIndex: -1,
        activeDatumIndex: -1,
        title: undefined,
    });
    const theme = useTheme();

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
                    <button
                        className={twMerge(
                            'chip h-6',
                            theme === 'dark' && 'chip-dark',
                            balanceChip === DAY && 'chip-active',
                        )}
                        onClick={() => setBalanceChip(DAY)}
                    >
                        день
                    </button>
                    <button
                        className={twMerge(
                            'chip h-6',
                            theme === 'dark' && 'chip-dark',
                            balanceChip === WEEK && 'chip-active',
                        )}
                        onClick={() => setBalanceChip(WEEK)}
                    >
                        неделя
                    </button>
                    <button
                        className={twMerge(
                            'chip h-6',
                            theme === 'dark' && 'chip-dark',
                            balanceChip === MONTH && 'chip-active',
                        )}
                        onClick={() => setBalanceChip(MONTH)}
                    >
                        месяц
                    </button>
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
                                            title: undefined,
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
                                <div className="inline-block h-[10px] w-[10px] rounded-[10px] bg-primary" /> -
                                Начисления
                            </div>
                            <div className="text-white">
                                <div className="inline-block h-[10px] w-[10px] rounded-[10px] bg-error text-white" /> -
                                Списания
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex gap-2 p-2">
                    <button
                        className={twMerge('chip h-6', usersChip === DAY && 'chip-active')}
                        onClick={() => setUsersChip(DAY)}
                    >
                        день
                    </button>
                    <button
                        className={twMerge(
                            'chip h-6',
                            theme === 'dark' && 'chip-dark',
                            usersChip === ALL_TIME && 'chip-active',
                        )}
                        onClick={() => setUsersChip(ALL_TIME)}
                    >
                        всё время
                    </button>
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
