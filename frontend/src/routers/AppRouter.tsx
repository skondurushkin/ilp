import { useAuthContext } from '../hooks/useAuthContext';
import { AuthContext } from './AuthContext';
import { GuestRouter } from './GuestRouter';
import { AuthUserRouter } from './AuthUserRouter';
import { BrowserRouter } from 'react-router-dom';

export enum RouterCase {
    GUEST = 'GUEST',
    USER = 'USER',
}

const AppRouter = () => {
    const { authContext, isAuthenticated } = useAuthContext();

    const RouterSwitch = {
        [RouterCase.GUEST]: !isAuthenticated,
        [RouterCase.USER]: isAuthenticated,
    };

    let Router;
    const route = Object.keys(RouterSwitch).find((key) => RouterSwitch[key as RouterCase]);

    switch (route) {
        case RouterCase.GUEST:
            Router = <GuestRouter />;
            break;
        case RouterCase.USER:
            Router = <AuthUserRouter />;
            break;
        default:
            Router = <GuestRouter />;
            break;
    }

    console.log('isAuthenticated', isAuthenticated);

    return (
        <AuthContext.Provider value={authContext}>
            <BrowserRouter>{Router}</BrowserRouter>
        </AuthContext.Provider>
    );
};

export default AppRouter;
