import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export interface UseAdminTableSearchParams {
    storage: 'state' | 'query';
    queryStorageName?: string;
}

export const useAdminTableSearch = (params: UseAdminTableSearchParams) => {
    const { storage, queryStorageName = 'filter' } = params;

    const [globalFilterState, setGlobalFilterState] = useState('');
    const [search, setSearch] = useSearchParams();

    const globalFilter = storage === 'query' ? search.get(queryStorageName) ?? '' : globalFilterState;

    const setGlobalFilter = (filter: string) => {
        if (storage === 'query') {
            setSearch(
                { [queryStorageName]: filter },
                {
                    replace: true,
                },
            );
        } else {
            setGlobalFilterState(filter);
        }
    };

    return {
        globalFilter,
        setGlobalFilter,
    };
};
