import { BrowseActivitiesRequest, GetActivityByIdRequest, api } from '../../api';

import { useQuery } from 'react-query';

export const ACTIVITIES_ADMIN_PAGE_QUERY_KEY = 'activity.browseActivities';

export const useQueryActivityById = (requestParameters: GetActivityByIdRequest) => {
    return useQuery(
        ['activity.getActivityById', requestParameters],
        () => api.activity.getActivityById(requestParameters),
        {
            retry: false,
            refetchOnWindowFocus: false,
        },
    );
};

export const useQueryBrowseActivities = (requestParameters: BrowseActivitiesRequest) => {
    return useQuery(
        ['activity.browseActivities', requestParameters],
        () => api.activity.browseActivities(requestParameters),
        {
            retry: false,
            refetchOnWindowFocus: false,
        },
    );
};
