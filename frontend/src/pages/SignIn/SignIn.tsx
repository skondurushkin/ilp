import { FormEvent, useState } from 'react';

import { useAuthActions } from '../../modules/auth';

export const SignIn = () => {
    const { signIn } = useAuthActions();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        signIn(email, password);
    };
    return (
        <div>
            <h1>Sign in</h1>
            <br />
            <br />
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="bg-primary px-8 py-4 font-bold">Войти</button>
            </form>
        </div>
    );
};
