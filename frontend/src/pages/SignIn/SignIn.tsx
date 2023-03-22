import { UserRole, useAuthActions } from '../../modules/auth';

export const SignIn = () => {
    const { signIn } = useAuthActions();

    return (
        <div>
            <h1>Sign in</h1>
            <br />
            <br />
            <button
                className="bg-primary px-8 py-4 font-bold"
                onClick={() => {
                    signIn(UserRole.USER);
                }}
            >
                Войти
            </button>
        </div>
    );
};
