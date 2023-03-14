import { useQuery } from 'react-query';
import { useAuthContext } from '../../hooks/useAuthContext';
import { TypedLink } from '../../routers/components';
import { ReactComponent as LoadingSVG } from '../../assets/loading.svg';
import { api } from '../../api';

export const Dashboard = () => {
    const { authContext } = useAuthContext();

    const {
        data: hello,
        isSuccess,
        isFetching,
        refetch,
    } = useQuery('hello', api.IlpApi.sayHello, {
        refetchOnWindowFocus: false,
        enabled: false, // disable this query from automatically running
    });

    return (
        <div>
            <h1>Dashboard</h1>
            <TypedLink to="/profile">To profile</TypedLink>
            <br />
            <br />

            {!isSuccess && <button onClick={() => refetch()}>Get Hello</button>}
            <div className="App">{isFetching ? <LoadingSVG /> : hello?.data?.greeting}</div>

            <br />
            <br />

            <button
                onClick={() => {
                    authContext.signOut();
                }}
            >
                Sign out
            </button>
        </div>
    );
};
