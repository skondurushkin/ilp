import { ProfileResponse, api } from '../../api';
import { UseQueryResult, useQuery } from 'react-query';

export const useProfileQuery = (): UseQueryResult<ProfileResponse> => {
    return useQuery('profile', () => api.profile.getProfile(), { retry: false, refetchOnWindowFocus: false });
};
