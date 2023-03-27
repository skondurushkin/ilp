import { api } from '../../api';
import { createUseQueryHook } from '../../utils/createUseQuery';

export const useProfileQuery = createUseQueryHook('profile', () => api.profile.getProfile());
