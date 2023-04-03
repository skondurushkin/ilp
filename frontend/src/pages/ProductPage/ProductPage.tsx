import { BigTextSkeleton, ButtonSkeleton, ImageSkeleton, Skeleton, SkeletonContainer } from '../../components/Skeleton';

import { ArticleResponse } from '../../api';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Layout';
import { ProductPrice } from '../../components/ProductPrice';
import { ReactElement } from 'react';
import { VerticalBrackets } from '../../components/VerticalBrackets';
import { useParams } from 'react-router';
import { useProductQuery } from '../../modules/loyalty';

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
        return <Layout>Invalid product id &quot;{id}&quot;</Layout>;
    }

    const productQuery = useProductQuery(productId);

    return (
        <Layout>
            {productQuery.isSuccess && <ProductView product={productQuery.data} />}
            {!productQuery.isSuccess && <SkeletonView />}
        </Layout>
    );
}

interface ProductViewProps {
    product: ArticleResponse;
}

function ProductView(props: ProductViewProps): ReactElement {
    const { product } = props;
    return (
        <>
            <div>
                <Breadcrumbs items={[{ label: 'Главная страница', link: '/' }, { label: product.name }]} />
                <VerticalBrackets className="mt-6" size="4">
                    <img src={product.imageLink} alt={product.name} />
                </VerticalBrackets>
                <h1 className="text-h1 mt-8">{product.name}</h1>
                <ProductPrice className="mt-4 w-min" price={product.price || 0} themed />
                {product.description && <p className="mt-4">{product.description}</p>}
            </div>
            <div className="app-bg sticky bottom-0 pt-6 pb-10 sm:pb-8">
                <Button primary className="w-full md:w-min">
                    Заказать
                </Button>
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
