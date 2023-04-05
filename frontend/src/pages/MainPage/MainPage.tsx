import 'swiper/swiper.min.css';

import { ButtonSkeleton, SkeletonContainer } from '../../components/Skeleton';
import { ReactElement, ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useActivitiesQuery, useProductsCatalogQuery, useWalletQuery } from '../../modules/loyalty';

import { ActivityCard } from './ActivityCard';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Layout';
import { PageSection } from '../../components/PageSection';
import { ProductCard } from '../../components/ProductCard';
import { WalletCard } from '../../components/WalletCard';
import { range } from '../../utils/range';
import { useIsXsScreen } from '../../components/useBreakpoint';

export const MainPage = () => {
    const walletQuery = useWalletQuery();
    const activitiesQuery = useActivitiesQuery();
    const productsCatalogQuery = useProductsCatalogQuery();

    return (
        <Layout
            menu={
                <ul className="flex items-center gap-4">
                    <li>
                        <a href="#balance">Мой баланс</a>
                    </li>
                    <li>
                        <a href="#activities">Как заработать вольты</a>
                    </li>
                    <li>
                        <a href="#products">На что потратить вольты</a>
                    </li>
                </ul>
            }
        >
            <PageSection id="balance">
                {walletQuery.status !== 'success' && <WalletCard skeleton extended />}
                {walletQuery.status === 'success' && <WalletCard wallet={walletQuery.data} extended />}
            </PageSection>
            <PageSection id="activities" className="mt-6 md:mt-10" caption="Как заработать вольты">
                <AdaptiveGrid>
                    {activitiesQuery.status !== 'success' && range(9).map((n) => <ActivityCard key={n} skeleton />)}
                    {activitiesQuery.status === 'success' &&
                        activitiesQuery.data.map((activity) => <ActivityCard key={activity.id} activity={activity} />)}
                </AdaptiveGrid>
            </PageSection>
            <PageSection id="products" className="mt-6 md:mt-10" caption="На что можно потратить вольты">
                <AdaptiveGrid>
                    {productsCatalogQuery.status !== 'success' &&
                        range(3).map((n) => <ProductCard key={n} skeleton withPrice withAction />)}
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
                            } else if (walletQuery.data.balance - product.price < 0) {
                                action = <Button disabled>Недостаточно баллов</Button>;
                            } else {
                                action = <Button primary>Заказать</Button>;
                            }
                            return <ProductCard key={product.id} product={product} showPrice action={action} />;
                        })}
                </AdaptiveGrid>
            </PageSection>
        </Layout>
    );
};

interface AdaptiveGridProps {
    children?: (boolean | JSX.Element[])[];
}

function AdaptiveGrid(props: AdaptiveGridProps): ReactElement {
    const { children } = props;

    const isXsScreen = useIsXsScreen();

    const elements: ReactElement[] = [];
    if (Array.isArray(children)) {
        elements.push(...children.flat().filter((c): c is ReactElement => typeof c !== 'boolean'));
    }

    if (isXsScreen) {
        return (
            <Swiper slidesPerView={1} spaceBetween={16}>
                {elements.map((el) => (
                    <SwiperSlide key={el.key}>{el}</SwiperSlide>
                ))}
            </Swiper>
        );
    }

    return <div className="grid auto-rows-auto grid-cols-3 gap-3 xl:gap-8">{elements}</div>;
}
