import { ArticleResponse, WriteOffResponse, WriteOffStatus, api, fetchAll } from '../../api';
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query';

import { WALLET_QUERY } from './wallet';

const ORDERS_QUERY_KEY = 'orders';

export const useOrdersQuery = (statuses?: WriteOffStatus[]): UseQueryResult<WriteOffResponse[]> => {
    let status: Set<WriteOffStatus> | undefined;
    if (statuses !== undefined && statuses.length > 0) {
        status = new Set(statuses);
    }
    const key: unknown[] = [ORDERS_QUERY_KEY];
    if (status !== undefined) {
        key.push(...Array.from(status));
    }
    return useQuery(
        key,
        () =>
            fetchAll((params) =>
                api.wallet.browseWriteOffs({ browseWriteOffsRequest: { ...params.pageRequest, status } }),
            ),
        {
            retry: false,
            refetchOnWindowFocus: false,
        },
    );
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
