import { GetArticleByIdRequest, api } from '../../api';

import { useQuery } from 'react-query';

export const PRODUCTS_ADMIN_PAGE_QUERY_KEY = 'admin.browseArticlesForAdmin';

export const useQueryProductById = (requestParameters: GetArticleByIdRequest) => {
    return useQuery(
        ['article.getArticleById', requestParameters],
        () => api.article.getArticleById(requestParameters),
        {
            retry: false,
            refetchOnWindowFocus: false,
        },
    );
};
