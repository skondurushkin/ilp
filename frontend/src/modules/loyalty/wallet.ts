import { UseQueryResult } from 'react-query';
import { WalletResponse } from '../../api';

export const useWalletQuery = (): UseQueryResult<WalletResponse> => {
    // return useQuery('wallet', () => api.wallet.getWalletOverview(), { retry: false, refetchOnWindowFocus: false });
    // const emptyWallet: WalletResponse = { balance: 0, totalEarned: 0, totalSpent: 0, accruals: [] };
    const wallet: WalletResponse = {
        balance: 90,
        totalEarned: 90,
        totalSpent: 0,
        accruals: [
            { id: 1, date: new Date(), activityName: 'за участие в внешнем мероприятии', amount: 30 },
            { id: 2, date: new Date(), activityName: 'за участие в внешнем мероприятии', amount: 30 },
            { id: 3, date: new Date(), activityName: 'за участие в внешнем мероприятии', amount: 30 },
        ],
    };
    return {
        // data: emptyWallet,
        data: wallet,
        error: null,
        isError: false,
        isIdle: false,
        isLoading: false,
        isLoadingError: false,
        isRefetchError: false,
        isSuccess: true,
        status: 'success',
    } as unknown as UseQueryResult<WalletResponse>;
};
