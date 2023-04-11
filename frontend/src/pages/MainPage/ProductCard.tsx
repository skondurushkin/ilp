import { ButtonSkeleton, ImageSkeleton, Skeleton, SkeletonContainer } from '../../components/Skeleton';
import { CreateOrderButton, ProductAvailability } from '../../components/CreateOrderButton';

import { ArticleResponse } from '../../api';
import { Box } from '../../components/Box';
import { ProductImage } from '../../components/ProductImage';
import { ProductPrice } from '../../components/ProductPrice';
import { ReactElement } from 'react';
import { RouterLink } from '../../components/RouterLink';

export interface ProductCardProps extends ProductViewProps {
    className?: string;
    skeleton?: never;
}

export interface ProductCardSkeletonProps {
    className?: string;
    product?: never;
    skeleton: true;
}

export function ProductCard(props: ProductCardProps | ProductCardSkeletonProps): ReactElement {
    const { className, ...rest } = props;
    return (
        <Box className={className}>
            {rest.product && <ProductView {...rest} />}
            {rest.skeleton && <SkeletonView />}
        </Box>
    );
}

interface ProductViewProps {
    product: ArticleResponse;
    availability: ProductAvailability;
}

function ProductView(props: ProductViewProps): ReactElement {
    const { product, availability } = props;

    return (
        <>
            <RouterLink to="/products/:id" params={{ id: `${product.id}` }} className="flex grow flex-col">
                <ProductImage src={product.imageLink || ''} alt={product.name} />
                <div className="mt-4 self-center text-center">{product.name}</div>
            </RouterLink>
            <ProductPrice className="mt-4" price={product.price || 0} />
            <div className="mt-4 flex flex-col">
                <CreateOrderButton product={product} availability={availability} />
            </div>
        </>
    );
}

function SkeletonView(): ReactElement {
    return (
        <SkeletonContainer>
            <ImageSkeleton className="h-48" />
            <Skeleton className="mx-auto mt-4 h-4 w-4/5" />
            <Skeleton className="mx-auto mt-4 h-9 w-1/4 md:h-10" />
            <ButtonSkeleton className="mt-4 w-full" />
        </SkeletonContainer>
    );
}
