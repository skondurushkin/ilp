import { ArticleResponse, api, fetchAll } from '../../api';
import { UseQueryResult, useQuery } from 'react-query';

export const useProductsCatalogQuery = (): UseQueryResult<ArticleResponse[]> => {
    return useQuery('products', () => fetchAll(api.article.browseArticles.bind(api.article)), {
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useProductQuery = (productId: number): UseQueryResult<ArticleResponse> => {
    return useQuery('product', () => api.article.getArticleById({ articleId: productId }), {
        retry: false,
        refetchOnWindowFocus: false,
    });
};
