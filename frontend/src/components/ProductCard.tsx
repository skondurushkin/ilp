import { ButtonSkeleton, ImageSkeleton, Skeleton, SkeletonContainer } from './Skeleton';
import { ReactElement, ReactNode } from 'react';

import { ArticleResponse } from '../api';
import { Box } from './Box';
import { ProductPrice } from './ProductPrice';
import { TypedLink } from '../router';
import { VerticalBrackets } from './VerticalBrackets';

export interface ProductCardProps extends ProductViewProps {
    className?: string;
    skeleton?: never;
}

export interface ProductCardSkeletonProps extends SkeletonViewProps {
    className?: string;
    product?: never;
}

export function ProductCard(props: ProductCardProps | ProductCardSkeletonProps): ReactElement {
    const { className, ...rest } = props;
    return (
        <Box className={className}>
            {rest.product && <ProductView {...rest} />}
            {rest.skeleton && <SkeletonView {...rest} />}
        </Box>
    );
}

export interface ProductViewProps {
    product: ArticleResponse;
    showPrice?: boolean;
    action?: ReactNode;
}

export function ProductView(props: ProductViewProps): ReactElement {
    const { product, showPrice, action } = props;
    return (
        <>
            <TypedLink to="/products/:id" params={{ id: `${product.id}` }} className="flex grow flex-col">
                <VerticalBrackets size="4">
                    <img src={product.imageLink} alt={product.name} />
                </VerticalBrackets>
                <div className="mt-4 self-center text-center">{product.name}</div>
            </TypedLink>
            {showPrice && <ProductPrice className="mt-4" price={product.price || 0} />}
            {action && <div className="mt-4 flex flex-col">{action}</div>}
        </>
    );
}

export interface SkeletonViewProps {
    skeleton: true;
    withPrice?: boolean;
    withAction?: boolean;
}

export function SkeletonView(props: SkeletonViewProps): ReactElement {
    return (
        <SkeletonContainer>
            <ImageSkeleton className="h-48" />
            <Skeleton className="mx-auto mt-4 h-4 w-4/5" />
            {props.withPrice && <Skeleton className="mx-auto mt-4 h-9 w-1/4 md:h-10" />}
            {props.withAction && <ButtonSkeleton className="mt-4 w-full" />}
        </SkeletonContainer>
    );
}
