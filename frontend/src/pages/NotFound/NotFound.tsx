import { TypedLink } from '../../router';

export const NotFound = () => {
    return (
        <div>
            <h1>NotFound</h1>
            <TypedLink to="/">Go to main page</TypedLink>
        </div>
    );
};
