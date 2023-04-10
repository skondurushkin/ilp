import { PaginatedAccrualResponse, PaginatedWriteOffResponse, WalletResponse, WriteOffStatus, api } from '../../api';
import { UseQueryResult, useQuery } from 'react-query';

import { Color } from '../../../colors';

export const WALLET_QUERY = 'wallet';

export const useWalletQuery = (): UseQueryResult<WalletResponse> => {
    return useQuery(WALLET_QUERY, () => api.wallet.getWalletOverview(), { retry: false, refetchOnWindowFocus: false });
};

export const WriteOffStatusName: Record<WriteOffStatus, string> = {
    [WriteOffStatus.Created]: 'Создан',
    [WriteOffStatus.Processing]: 'Комплектуется',
    [WriteOffStatus.Cancelled]: 'Отменен',
    [WriteOffStatus.Completed]: 'Выдан',
    [WriteOffStatus.Delivering]: 'Готов к выдаче',
};

export const WriteOffStatusColor: Record<WriteOffStatus, Color> = {
    [WriteOffStatus.Created]: 'gray',
    [WriteOffStatus.Processing]: 'gray',
    [WriteOffStatus.Cancelled]: 'error',
    [WriteOffStatus.Completed]: 'success',
    [WriteOffStatus.Delivering]: 'secondary-green',
};

const WALLET_HISTORY_PAGE_SIZE = 5;

export interface HistoryQueryParams {
    enabled?: boolean;
}

export const useAccrualsHistoryQuery = (
    page: number,
    params: HistoryQueryParams = {},
): UseQueryResult<PaginatedAccrualResponse> => {
    const loaderParams = { pageRequest: { page, pageSize: WALLET_HISTORY_PAGE_SIZE } };
    const loader = () => api.wallet.browseAccruals(loaderParams);

    return useQuery(['accruals-history', page], loader, {
        retry: false,
        refetchOnWindowFocus: false,
        ...params,
    });
};

export const useWriteOffsHistoryQuery = (
    page: number,
    params: HistoryQueryParams = {},
): UseQueryResult<PaginatedWriteOffResponse> => {
    const loaderParams = { browseWriteOffsRequest: { page, pageSize: WALLET_HISTORY_PAGE_SIZE } };
    const loader = () => api.wallet.browseWriteOffs(loaderParams);
    return useQuery(['write-offs-history', page], loader, {
        retry: false,
        refetchOnWindowFocus: false,
        ...params,
    });
};
