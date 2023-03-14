import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../config/constants';
import { useAuthContext } from '../../hooks/useAuthContext';

export const SignIn = () => {
    const { authContext } = useAuthContext();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Sign in</h1>
            <br />
            <br />
            <button
                onClick={() => {
                    authContext.signIn(UserRole.USER);
                    navigate('/');
                }}>
                signIn
            </button>
        </div>
    );
};
