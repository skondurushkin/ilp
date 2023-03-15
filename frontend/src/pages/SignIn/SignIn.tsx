import { UserRole } from '../../config/constants';
import { useAuthActionsContext } from '../../hooks/useAuthActionsContext';

export const SignIn = () => {
    const { signIn } = useAuthActionsContext();

    return (
        <div>
            <h1>Sign in</h1>
            <br />
            <br />
            <button
                onClick={() => {
                    signIn(UserRole.USER);
                }}
            >
                signIn
            </button>
        </div>
    );
};
