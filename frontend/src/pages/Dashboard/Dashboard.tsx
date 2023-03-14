import { useAuthContext } from '../../hooks/useAuthContext';
import { TypedLink } from '../../routers/components';

export const Dashboard = () => {
    const { authContext } = useAuthContext();

    return (
        <div>
            <h1>Dashboard</h1>
            <TypedLink to="/profile">To profile</TypedLink>
            <br />
            <button
                onClick={() => {
                    authContext.signOut();
                }}>
                Sign out
            </button>
        </div>
    );
};
