import { ActivityResponse, GetActivityByIdRequest, api } from '../../api';
import { UseQueryResult, useQuery } from 'react-query';

export const useQueryActivityById = (requestParameters: GetActivityByIdRequest): UseQueryResult<ActivityResponse> => {
    return useQuery(
        ['api.activity.getActivityById', requestParameters],
        () => api.activity.getActivityById(requestParameters),
        {
            retry: false,
            refetchOnWindowFocus: false,
        },
    );
};
