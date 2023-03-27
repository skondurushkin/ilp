import { useQuery } from 'react-query';

export type Query<T> = SuccessQuery<T> | ErrorQuery | PendingQuery;

export interface SuccessQuery<T> {
    status: 'success';
    data: T;
}

export interface ErrorQuery {
    status: 'error';
    error: unknown;
}

export interface PendingQuery {
    status: 'pending';
}

export function createUseQueryHook<T>(name: string, fn: () => Promise<T>) {
    return (): Query<T> => {
        const q = useQuery(name, fn, { retry: false, refetchOnWindowFocus: false });
        const { isSuccess, data, isError, isLoadingError, error } = q;
        if (isSuccess && data) {
            return { status: 'success', data };
        }
        if (isError || isLoadingError) {
            return { status: 'error', error };
        }
        return { status: 'pending' };
    };
}
