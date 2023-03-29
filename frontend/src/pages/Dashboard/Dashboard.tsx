import { useAuth, useAuthActions } from '../../modules/auth';

import { TypedLink } from '../../router';

export const Dashboard = () => {
    const { signOut } = useAuthActions();
    const authData = useAuth();

    return (
        <div>
            <h1>Dashboard role {Array.from(authData.me.roles ?? []).join(', ')}</h1>
            <TypedLink to="/profile">To profile</TypedLink>
            <br />
            <br />

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
