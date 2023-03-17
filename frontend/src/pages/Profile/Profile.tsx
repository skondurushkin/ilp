import { TypedLink } from '../../router';

export const Profile = () => {
    return (
        <div>
            <h1>Profile</h1>
            <TypedLink to="/dashboard">Go to dashboard</TypedLink>
        </div>
    );
};
