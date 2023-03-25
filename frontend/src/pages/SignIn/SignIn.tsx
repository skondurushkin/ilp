import { ERR_UNAUTHORIZED, useAuthActions } from '../../modules/auth';
import { FormEvent, useState } from 'react';

import { ReactComponent as CrossedEyeSVG } from '../../assets/crossed-eye.svg';
import { ReactComponent as EyeSVG } from '../../assets/eye.svg';
import LoginImageURL from '../../assets/login-image.svg';
import { ReactComponent as LogoSVG } from '../../assets/logo.svg';
import { ReactComponent as LogoWhiteSVG } from '../../assets/logo-white.svg';

export interface FormErrors {
    credentials?: string;
    unknown?: string;
}

export const SignIn = () => {
    const { signIn } = useAuthActions();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<FormErrors>();

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        signIn(email, password).catch((err) => {
            if (err === ERR_UNAUTHORIZED) {
                setErrors({ credentials: 'Неверные электронная почта или пароль' });
            } else {
                setErrors({ credentials: 'Неизвестная ошибка. Попробуйте снова' });
            }
        });
    };

    return (
        <div className="flex h-screen flex-col-reverse justify-end gap-4 sm:flex-row xl:justify-center">
            <div className="p-6">
                <LogoSVG className="hidden sm:block" />
                <form
                    className="flex h-full max-w-[640px] flex-col justify-center self-center sm:mt-8 sm:w-[50vw]"
                    onSubmit={submit}
                >
                    <span className="text-left xs:text-xl sm:text-3xl">
                        Войдите, чтобы воспользоваться преимуществами программы лояльности
                    </span>
                    <br />
                    {errors && <div className="text-left text-error">{errors.credentials || errors.unknown}</div>}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-left">
                            Введите вашу электронную почту
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            className={`focus:green h-[50px] border px-3 focus:border-success focus:outline-none
                                ${errors?.credentials ? 'border-error' : ''}
                                `}
                        />
                    </div>
                    <br />
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-left">
                            Введите ваш пароль
                        </label>
                        <div className="relative inline-flex text-left">
                            <input
                                type={`${passwordVisible ? 'text' : 'password'}`}
                                onChange={({ target }) => setPassword(target.value)}
                                id="password"
                                value={password}
                                className={`focus:green relative h-[50px] w-full border px-3 focus:border-success ${
                                    errors?.credentials ? 'border-error' : ''
                                } focus:outline-none`}
                            />
                            {passwordVisible ? (
                                <CrossedEyeSVG
                                    className="absolute bottom-3 right-3 "
                                    onClick={() => setPasswordVisible((v) => !v)}
                                />
                            ) : (
                                <EyeSVG
                                    className="absolute bottom-3 right-3"
                                    onClick={() => setPasswordVisible((v) => !v)}
                                />
                            )}
                        </div>
                    </div>
                    <br />
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <button className="bg-primary px-8 py-4">Войти</button>
                        <button type="button" className="border py-4  px-8">
                            Забыли пароль?
                        </button>
                    </div>
                </form>
            </div>
            <div
                className="h-[50vh] bg-cover sm:h-full sm:w-[50vw]"
                style={{ backgroundImage: `url(${LoginImageURL})` }}
            >
                <LogoWhiteSVG className="relative top-6 left-6 block sm:hidden" />
            </div>
        </div>
    );
};
