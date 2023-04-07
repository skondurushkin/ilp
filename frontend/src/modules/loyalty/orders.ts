import { ArticleResponse, WriteOffResponse, api, fetchAll } from '../../api';
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query';

import { WALLET_QUERY } from './wallet';

const ORDERS_QUERY_KEY = 'orders';

export const useOrdersQuery = (): UseQueryResult<WriteOffResponse[]> => {
    return useQuery(ORDERS_QUERY_KEY, () => fetchAll(api.wallet.browseWriteOffs.bind(api.wallet)), {
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useCreateOrderMutation = (): UseMutationResult<WriteOffResponse, unknown, ArticleResponse> => {
    const queryClient = useQueryClient();
    return useMutation(
        (product: ArticleResponse) => {
            return api.wallet.writeOff({ writeOffRequest: { articleId: product.id } });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(ORDERS_QUERY_KEY);
                queryClient.invalidateQueries(WALLET_QUERY);
            },
        },
    );
};
