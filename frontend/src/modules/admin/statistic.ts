import {
    BrowseStatisticActivitiesOperationRequest,
    BrowseStatisticArticlesOperationRequest,
    BrowseStatisticBalanceRequest,
    BrowseStatisticUsersRequest,
    api,
} from '../../api';

import { useQuery } from 'react-query';

export const BALANCE_STATISTIC_ADMIN_QUERY_KEY = 'browseStatisticBalance';
export const USERS_STATISTIC_ADMIN_QUERY_KEY = 'browseStatisticUsers';
export const ARTICLES_STATISTIC_ADMIN_QUERY_KEY = 'browseStatisticArticles';
export const ACTIVITIES_STATISTIC_ADMIN_QUERY_KEY = 'browseStatisticActivities';

export const useQueryBalanceStatistic = (requestParameters: BrowseStatisticBalanceRequest) => {
    return useQuery(
        ['api.admin.browseStatisticBalance', requestParameters],
        () => api.admin.browseStatisticBalance(requestParameters),
        {
            retry: false,
            refetchOnWindowFocus: false,
        },
    );
};

export const useQueryUsersStatistic = (requestParameters: BrowseStatisticUsersRequest) => {
    return useQuery(
        ['api.admin.browseStatisticUsers', requestParameters],
        () => api.admin.browseStatisticUsers(requestParameters),
        {
            retry: false,
            refetchOnWindowFocus: false,
        },
    );
};

export const useQueryActivitiesStatistic = (requestParameters: BrowseStatisticActivitiesOperationRequest) => {
    return useQuery(
        ['api.admin.browseStatisticActivities', requestParameters],
        () => api.admin.browseStatisticActivities(requestParameters),
        {
            retry: false,
            refetchOnWindowFocus: false,
        },
    );
};

export const useQueryArticlesStatistic = (requestParameters: BrowseStatisticArticlesOperationRequest) => {
    return useQuery(
        ['api.admin.browseStatisticArticles', requestParameters],
        () => api.admin.browseStatisticArticles(requestParameters),
        {
            retry: false,
            refetchOnWindowFocus: false,
        },
    );
};
