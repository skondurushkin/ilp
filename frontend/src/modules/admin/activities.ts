import { GetActivityByIdRequest, api } from '../../api';

import { useQuery } from 'react-query';

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
