import { UseQueryResult, useQuery } from 'react-query';
import { WriteOffResponse, api, fetchAll } from '../../api';

export const useOrdersQuery = (): UseQueryResult<WriteOffResponse[]> => {
    return useQuery('orders', () => fetchAll(api.wallet.browseWriteOffs.bind(api.wallet)), {
        retry: false,
        refetchOnWindowFocus: false,
    });
};
