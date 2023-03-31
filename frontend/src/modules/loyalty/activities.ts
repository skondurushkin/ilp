import { ActivityResponse, api, fetchAll } from '../../api';
import { UseQueryResult, useQuery } from 'react-query';

export const useActivitiesQuery = (): UseQueryResult<ActivityResponse[]> => {
    return useQuery('activities', () => fetchAll(api.activity.browseActivities.bind(api.activity)), {
        retry: false,
        refetchOnWindowFocus: false,
    });
};
