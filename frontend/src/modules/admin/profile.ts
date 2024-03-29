import { GetProfileByIdAsAdminRequest, SearchProfileAsAdminRequest, api } from '../../api';
import { useInfiniteQuery, useQuery } from 'react-query';

export const useQuerySearchProfileAsAdmin = (searchKey: SearchProfileAsAdminRequest['searchKey']) => {
    return useInfiniteQuery({
        queryKey: ['admin.searchProfileAsAdmin', searchKey],
        queryFn: ({ pageParam }) =>
            api.admin.searchProfileAsAdmin({
                page: pageParam ?? 0,
                pageSize: 6,
                searchKey,
            }),
        getNextPageParam: (lastPage) => {
            if (lastPage.hasNext) {
                return Number(lastPage.page) + 1;
            }
            return undefined;
        },
        enabled: !!searchKey,
        keepPreviousData: true,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const PROFILE_BY_ID_AS_ADMIN_QUERY_KEY = 'admin.getProfileByIdAsAdmin';

export const useQueryProfileByIdAsAdmin = (requestParameters: GetProfileByIdAsAdminRequest) => {
    return useQuery(
        [PROFILE_BY_ID_AS_ADMIN_QUERY_KEY, requestParameters],
        () => api.admin.getProfileByIdAsAdmin(requestParameters),
        {
            retry: false,
            refetchOnWindowFocus: false,
        },
    );
};
