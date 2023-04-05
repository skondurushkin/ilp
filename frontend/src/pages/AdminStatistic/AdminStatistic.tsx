import { ButtonSkeleton, SkeletonContainer } from '../../components/Skeleton';
import React, { ReactNode, useState } from 'react';
import { data, dataDay, dataUsersAllTime, dataUsersDay, dataWeek } from './mockData';
import { useProductsCatalogQuery, useWalletQuery } from '../../modules/loyalty';

// eslint-disable-next-line import/no-unresolved
import { AxisOptions } from 'react-charts/types/types';
import { Button } from '../../components/Button';
import { Chart } from 'react-charts';
import { Layout } from '../../components/Layout';
import { PageSection } from '../../components/PageSection';
import { ProductCard } from '../../components/ProductCard';
import { range } from '../../utils/range';
import { twMerge } from 'tailwind-merge';
import { useTheme } from '../../theme';

const DAY = 'day';
const WEEK = 'week';
const MONTH = 'month';
const ALL_TIME = 'all';

type BalanceChip = 'day' | 'week' | 'month';
type UsersChip = 'day' | 'all';

export function AdminStatistic() {
    const [balanceChip, setBalanceChip] = useState<BalanceChip>('day');
    const [usersChip, setUsersChip] = useState<UsersChip>('day');
    const [focused, setFocused] = useState({
        activeSeriesIndex: -1,
        activeDatumIndex: -1,
    });
    const theme = useTheme();

    const walletQuery = useWalletQuery();
    const productsCatalogQuery = useProductsCatalogQuery();

    const primaryAxis = React.useMemo<AxisOptions<(typeof data)[number]['data'][number]>>(
        () => ({
            getValue: (datum) => datum.date,
        }),
        [],
    );

    const secondaryAxes = React.useMemo<AxisOptions<(typeof data)[number]['data'][number]>[]>(
        () => [
            {
                getValue: (datum) => datum.stars,
            },
        ],
        [],
    );

    return (
        <Layout>
            <div className="flex flex-col gap-8">
                <div className="text-h1">Статистика</div>
                <PageSection id="products" className="" caption="Движение вольт по балансу пользователей">
                    <div className="flex flex-col gap-4">
                        {/* <div className="text-h2"></div> */}
                        <div className="flex gap-2 pl-2">
                            <button
                                className={twMerge('chip h-6', balanceChip === DAY && 'chip-active')}
                                onClick={() => setBalanceChip(DAY)}
                            >
                                день
                            </button>
                            <button
                                className={twMerge('chip h-6', balanceChip === WEEK && 'chip-active')}
                                onClick={() => setBalanceChip(WEEK)}
                            >
                                неделя
                            </button>
                            <button
                                className={twMerge('chip h-6', balanceChip === MONTH && 'chip-active')}
                                onClick={() => setBalanceChip(MONTH)}
                            >
                                месяц
                            </button>
                        </div>

                        <div className="h-[50vh]">
                            <Chart
                                options={{
                                    data: balanceChip === 'week' ? dataWeek : balanceChip === 'day' ? dataDay : data,
                                    primaryAxis,
                                    secondaryAxes,
                                    dark: theme === 'dark',
                                    getSeriesStyle: (series) => ({
                                        color: series.originalSeries.color,
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
                    </div>
                </PageSection>

                <div className="flex gap-2 pl-2">
                    <button
                        className={twMerge('chip h-6', usersChip === DAY && 'chip-active')}
                        onClick={() => setUsersChip(DAY)}
                    >
                        день
                    </button>
                    <button
                        className={twMerge('chip h-6', usersChip === ALL_TIME && 'chip-active')}
                        onClick={() => setUsersChip(ALL_TIME)}
                    >
                        всё время
                    </button>
                </div>
                <PageSection id="products" className="" caption="Топ товаров">
                    <div className="grid auto-rows-auto grid-cols-3 gap-3 xl:gap-8">
                        {productsCatalogQuery.status !== 'success' &&
                            range(3).map((n) => {
                                return <ProductCard key={n} skeleton withPrice withAction />;
                            })}
                        {productsCatalogQuery.status === 'success' &&
                            productsCatalogQuery.data.map((product) => {
                                let action: ReactNode;
                                if (!product.available) {
                                    action = <Button disabled>Нет в наличии</Button>;
                                } else if (!walletQuery.isSuccess) {
                                    action = (
                                        <SkeletonContainer>
                                            <ButtonSkeleton />
                                        </SkeletonContainer>
                                    );
                                } else if (walletQuery.data.balance - (product.price || 0) < 0) {
                                    action = <Button disabled>Недостаточно баллов</Button>;
                                } else {
                                    action = <Button primary>Заказать</Button>;
                                }
                                return <ProductCard key={product.id} product={product} showPrice action={action} />;
                            })}
                    </div>
                </PageSection>
                <PageSection id="products" className="" caption="Топ активностей">
                    <div className="grid auto-rows-auto grid-cols-3 gap-3 xl:gap-8">
                        {productsCatalogQuery.status !== 'success' &&
                            range(3).map((n) => {
                                return <ProductCard key={n} skeleton withPrice withAction />;
                            })}
                        {productsCatalogQuery.status === 'success' &&
                            productsCatalogQuery.data.map((product) => {
                                let action: ReactNode;
                                if (!product.available) {
                                    action = <Button disabled>Нет в наличии</Button>;
                                } else if (!walletQuery.isSuccess) {
                                    action = (
                                        <SkeletonContainer>
                                            <ButtonSkeleton />
                                        </SkeletonContainer>
                                    );
                                } else if (walletQuery.data.balance - (product.price || 0) < 0) {
                                    action = <Button disabled>Недостаточно баллов</Button>;
                                } else {
                                    action = <Button primary>Заказать</Button>;
                                }
                                return <ProductCard key={product.id} product={product} showPrice action={action} />;
                            })}
                    </div>
                </PageSection>
                <div className="flex flex-col gap-4">
                    <div className="text-h2">Статистика входов посетителей</div>
                    <div className="h-[50vh]">
                        <Chart
                            options={{
                                data: usersChip === 'day' ? dataUsersDay : dataUsersAllTime,
                                primaryAxis,
                                secondaryAxes,
                                dark: theme === 'dark',

                                getSeriesStyle: () => ({
                                    color: '#AAE632',
                                    width: '22px',
                                }),
                            }}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
