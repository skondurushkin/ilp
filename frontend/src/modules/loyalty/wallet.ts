import { UseQueryResult, useQuery } from 'react-query';
import { WalletResponse, api } from '../../api';

export const useWalletQuery = (): UseQueryResult<WalletResponse> => {
    return useQuery('wallet', () => api.wallet.getWalletOverview(), { retry: false, refetchOnWindowFocus: false });
};
