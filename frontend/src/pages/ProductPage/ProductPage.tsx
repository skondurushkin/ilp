import { BigTextSkeleton, ButtonSkeleton, ImageSkeleton, Skeleton, SkeletonContainer } from '../../components/Skeleton';
import { CreateOrderButton, ProductAvailability } from '../../components/CreateOrderButton';
import { useProductQuery, useWalletQuery } from '../../modules/loyalty';

import { ArticleResponse } from '../../api';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductImage } from '../../components/ProductImage';
import { ProductPrice } from '../../components/ProductPrice';
import { ReactElement } from 'react';
import { useParams } from 'react-router';

interface ProductPageParams {
    id: string;
}

export function ProductPage(): ReactElement {
    const { id } = useParams<keyof ProductPageParams>();

    if (id == undefined) {
        throw new Error('product id is not found in the path: invalid router configuration');
    }
    let productId: number;
    try {
        productId = parseInt(id, 10);
    } catch {
        return <div>Invalid product id &quot;{id}&quot;</div>;
    }

    const productQuery = useProductQuery(productId);

    return (
        <div>
            {productQuery.isSuccess && <ProductView product={productQuery.data} />}
            {!productQuery.isSuccess && <SkeletonView />}
        </div>
    );
}

interface ProductViewProps {
    product: ArticleResponse;
}

function ProductView(props: ProductViewProps): ReactElement {
    const { product } = props;

    const walletQuery = useWalletQuery();
    let availability: ProductAvailability;
    if (!product.available) {
        availability = 'not-available';
    } else if (!walletQuery.isSuccess) {
        availability = 'processing';
    } else if (walletQuery.data.balance - product.price < 0) {
        availability = 'no-tokens';
    } else {
        availability = 'available';
    }

    return (
        <>
            <Breadcrumbs items={[{ label: 'Главная страница', link: '/' }, { label: product.name }]} />
            <div className="md:flex md:gap-8">
                <div className="mt-6 bg-black p-4 md:w-1/2">
                    <ProductImage
                        className="pt-[133%] sm:pt-[54%] md:pt-[100%] xl:pt-[100%]"
                        imageClassName="py-9"
                        src={product.imageLink || ''}
                        alt={product.name}
                    />
                </div>
                <div className="mt-8 md:w-1/2">
                    <h1 className="text-h1">{product.name}</h1>
                    <ProductPrice className="mt-4 w-min" price={product.price || 0} themed />
                    {product.description && <p className="mt-4 md:mt-5">{product.description}</p>}
                    <div className="app-bg sticky bottom-0 pb-10 pt-6 sm:pb-8">
                        <CreateOrderButton product={product} availability={availability} />
                    </div>
                </div>
            </div>
        </>
    );
}

function SkeletonView(): ReactElement {
    return (
        <SkeletonContainer>
            <Skeleton className="h-5 w-full" />
            <ImageSkeleton className="mt-6 h-96 w-full" />
            <Skeleton className="mt-6 h-6 w-4/5" />
            <Skeleton className="mt-4 h-8 w-20" />
            <BigTextSkeleton className="mt-4" />
            <ButtonSkeleton className="mt-6 w-full" />
        </SkeletonContainer>
    );
}
