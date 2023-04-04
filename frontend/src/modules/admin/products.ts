import { GetArticleByIdRequest, api } from '../../api';

import { useQuery } from 'react-query';

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
