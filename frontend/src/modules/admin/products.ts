import { GetArticleByIdRequest, api } from '../../api';

import { useQuery } from 'react-query';

export const PRODUCTS_ADMIN_PAGE_QUERY_KEY = 'browseArticles';

export const useQueryProductById = (requestParameters: GetArticleByIdRequest) => {
    return useQuery(
        ['api.article.getArticleById', requestParameters],
        () => api.article.getArticleById(requestParameters),
        {
            retry: false,
            refetchOnWindowFocus: false,
        },
    );
};
