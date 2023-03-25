import { useAuth, useAuthActions } from '../../modules/auth';

import { ReactComponent as LoadingSVG } from '../../assets/loading.svg';
import { TypedLink } from '../../router';
import { api } from '../../api';
import { useQuery } from 'react-query';

export const Dashboard = () => {
    const { signOut } = useAuthActions();
    const authData = useAuth();

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
            <h1>Dashboard role {authData.me.roles?.join(', ')}</h1>
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
