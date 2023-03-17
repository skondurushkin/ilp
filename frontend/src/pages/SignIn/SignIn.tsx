import { UserRole, useAuthActions } from '../../modules/auth';

export const SignIn = () => {
    const { signIn } = useAuthActions();

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
