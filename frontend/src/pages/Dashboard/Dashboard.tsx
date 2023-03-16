import { useQuery } from 'react-query';
import { TypedLink } from '../../routers/components';
import { ReactComponent as LoadingSVG } from '../../assets/loading.svg';
import { useAuthActionsContext } from '../../hooks/useAuthActionsContext';
import { useAuthDataContext } from '../../hooks/useAuthDataContext';
import { api } from '../../api';

export const Dashboard = () => {
    const { signOut } = useAuthActionsContext();
    const { authData } = useAuthDataContext();

    const {
        data: hello,
        isSuccess,
        isFetching,
        refetch,
    } = useQuery(
        'hello',
        () => {
            return api.IlpApi.sayHello();
        },
        {
            refetchOnWindowFocus: false,
            enabled: false, // disable this query from automatically running
        },
    );

    return (
        <div>
            <h1>Dashboard role {authData.me?.role}</h1>
            <TypedLink to="/profile">To profile</TypedLink>
            <br />
            <br />

            {!isSuccess && <button onClick={() => refetch()}>Get Hello</button>}
            <div className="App">{isFetching ? <LoadingSVG /> : hello?.greeting}</div>

            <br />
            <br />

            <button
                onClick={() => {
                    signOut();
                }}
            >
                Sign out
            </button>
        </div>
    );
};
