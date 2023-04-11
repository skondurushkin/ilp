import { ImageSkeleton, Skeleton, SkeletonContainer } from '../../../components/Skeleton';
import { WriteOffStatusColor, WriteOffStatusName } from '../../../modules/loyalty';

import { Box } from '../../../components/Box';
import { ProductImage } from '../../../components/ProductImage';
import { ReactElement } from 'react';
import { RouteLink } from '../../../components/RouteLink';
import { VerticalBrackets } from '../../../components/VerticalBrackets';
import { WriteOffResponse } from '../../../api';

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
        <div className="flex flex-col">
            <RouteLink
                to="/products/:id"
                params={{ id: `${order.article.id}` }}
                className="flex grow flex-col items-center text-center"
            >
                <ProductImage src={order.article.imageLink || ''} alt={order.article.name} />
                <div className="text-gray mt-4">{new Date(order.date).toLocaleDateString('ru-RU')}</div>
                <div className="mt-4 font-bold">{order.article.name}</div>
            </RouteLink>
            <VerticalBrackets size="1" className="mt-4 self-center py-1" color={WriteOffStatusColor[order.status]}>
                <span className="px-1">{WriteOffStatusName[order.status]}</span>
            </VerticalBrackets>
        </div>
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
