import { AuthActions } from './AuthActionsContext';
import { AuthData } from './AuthContext';

export interface AuthBackend {
    authData: AuthData;
    authActions: AuthActions;
}
