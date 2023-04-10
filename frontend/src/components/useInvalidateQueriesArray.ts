import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

export const useInvalidateQueriesArray = () => {
    const queryClient = useQueryClient();

    const invalidateQueries = useCallback(async (queryKey: string | string[]) => {
        if (Array.isArray(queryKey)) {
            await Promise.all(queryKey.map((key) => queryClient.invalidateQueries(key)));
        } else {
            await queryClient.invalidateQueries(queryKey);
        }
    }, []);

    return {
        invalidateQueries,
    };
};
