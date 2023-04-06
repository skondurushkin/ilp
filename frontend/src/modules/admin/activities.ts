import { GetActivityByIdRequest, api } from '../../api';

import { useQuery } from 'react-query';

export const ACTIVITIES_ADMIN_PAGE_QUERY_KEY = 'browseActivities';

export const useQueryActivityById = (requestParameters: GetActivityByIdRequest) => {
    return useQuery(
        ['api.activity.getActivityById', requestParameters],
        () => api.activity.getActivityById(requestParameters),
        {
            retry: false,
            refetchOnWindowFocus: false,
        },
    );
};
