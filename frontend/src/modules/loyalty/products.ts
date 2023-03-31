import { ArticleResponse, api, fetchAll } from '../../api';
import { UseQueryResult, useQuery } from 'react-query';

export const useProductsCatalogQuery = (): UseQueryResult<ArticleResponse[]> => {
    return useQuery('articles', () => fetchAll(api.article.browseArticles.bind(api.article)), {
        retry: false,
        refetchOnWindowFocus: false,
    });
};
