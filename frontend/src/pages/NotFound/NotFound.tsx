import { TypedLink } from '../../router';

export const NotFound = () => {
    return (
        <div>
            <h1>NotFound</h1>
            <TypedLink to="/dashboard">Go to dashboard</TypedLink>
        </div>
    );
};
