import { ImageSkeleton, Skeleton, SkeletonContainer } from '../../components/Skeleton';

import { Box } from '../../components/Box';
import { ImageGallery } from '../../components/ImageGallery';
import { ReactElement } from 'react';
import { VerticalBrackets } from '../../components/VerticalBrackets';
import { WriteOffResponse } from '../../api';
import { WriteOffStatusName } from '../../modules/loyalty';

export interface OrderCardProps extends OrderViewProps {
    className?: string;
    skeleton?: never;
}

export interface OrderCardSkeletonProps {
    className?: string;
    order?: never;
    skeleton: true;
}

export function OrderCard(props: OrderCardProps | OrderCardSkeletonProps): ReactElement {
    const { className, ...rest } = props;
    return (
        <Box className={className}>
            {rest.order && <OrderView {...rest} />}
            {rest.skeleton && <SkeletonView />}
        </Box>
    );
}

interface OrderViewProps {
    order: WriteOffResponse;
}

function OrderView(props: OrderViewProps): ReactElement {
    const { order } = props;

    return (
        <>
            <div className="flex grow flex-col items-center text-center">
                <VerticalBrackets size="4" className="w-full">
                    <ImageGallery imgs={[{ src: order.article.imageLink || '', alt: order.article.name }]} />
                </VerticalBrackets>
                <div className="text-gray mt-4">{new Date(order.date).toLocaleDateString('ru-RU')}</div>
                <div className="mt-4 font-bold">{order.article.name}</div>
                <VerticalBrackets size="1" className="mt-4">
                    {WriteOffStatusName[order.status]}
                </VerticalBrackets>
            </div>
        </>
    );
}

function SkeletonView(): ReactElement {
    return (
        <SkeletonContainer>
            <ImageSkeleton className="h-48" />
            <Skeleton className="mx-auto mt-4 h-4 w-1/4" />
            <Skeleton className="mx-auto mt-4 h-4 w-4/5" />
            <Skeleton className="mx-auto mt-4 h-4 w-1/4" />
        </SkeletonContainer>
    );
}
