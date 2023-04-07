import {
    OperationResponse,
    OperationResponseTypeEnum,
    PaginatedOperationResponse,
    WalletResponse,
    WriteOffStatus,
    api,
} from '../../api';
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

export const useWalletHistoryQuery = (
    operationType: OperationResponseTypeEnum,
    page: number,
): UseQueryResult<PaginatedOperationResponse> => {
    const pageParams = { page, pageSize: WALLET_HISTORY_PAGE_SIZE };
    const laoder =
        operationType === 'accrual'
            ? () =>
                  api.wallet.browseAccruals({ pageRequest: pageParams }).then((coll) => {
                      return {
                          ...coll,
                          results: coll.results.map(
                              (accrual): OperationResponse => ({
                                  type: 'accrual',
                                  id: accrual.id,
                                  date: accrual.date,
                                  name: accrual.activityName,
                                  amount: accrual.amount,
                              }),
                          ),
                      };
                  })
            : () =>
                  api.wallet.browseWriteOffs({ browseWriteOffsRequest: pageParams }).then((coll) => {
                      return {
                          ...coll,
                          results: coll.results.map(
                              (writeOff): OperationResponse => ({
                                  type: 'writeOff',
                                  id: writeOff.id,
                                  date: writeOff.date,
                                  name: writeOff.article.name,
                                  amount: writeOff.amount,
                              }),
                          ),
                      };
                  });
    return useQuery(['wallet-history', operationType, page], laoder, {
        retry: false,
        refetchOnWindowFocus: false,
    });
};
