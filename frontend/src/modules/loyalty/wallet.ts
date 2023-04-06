import { UseQueryResult, useQuery } from 'react-query';
import { WalletResponse, WriteOffStatus, api } from '../../api';

export const useWalletQuery = (): UseQueryResult<WalletResponse> => {
    return useQuery('wallet', () => api.wallet.getWalletOverview(), { retry: false, refetchOnWindowFocus: false });
};

export const WriteOffStatusName = {
    [WriteOffStatus.Created]: 'Создан',
    [WriteOffStatus.Processing]: 'Комплектуется',
    [WriteOffStatus.Cancelled]: 'Отменен',
    [WriteOffStatus.Completed]: 'Выдан',
    [WriteOffStatus.Delivering]: 'Готов к выдаче',
};
