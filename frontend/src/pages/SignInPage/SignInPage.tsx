import { ERR_UNAUTHORIZED, useAuthActions } from '../../modules/auth';
import { FormEvent, useState } from 'react';

import { Button } from '../../components/Button';
import { ReactComponent as CrossedEyeSVG } from '../../assets/crossed-eye.svg';
import { ReactComponent as EyeSVG } from '../../assets/eye.svg';
import LoginImageURL from '../../assets/login-image.svg';
import { ReactComponent as LogoDark } from '../../assets/logo-dark.svg';
import { ReactComponent as LogoLight } from '../../assets/logo-light.svg';
import { twMerge } from 'tailwind-merge';

export interface FormErrors {
    credentials?: string;
    unknown?: string;
}

export const SignInPage = () => {
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
        <div className="relative flex h-screen flex-col-reverse justify-end gap-8 sm:gap-10 md:flex-row">
            <LogoDark className="absolute left-16 top-6 hidden md:block xl:left-8" />
            <LogoLight className="absolute top-6 left-4 sm:left-8 md:hidden" />
            <form
                className={twMerge(
                    // common
                    'flex h-full flex-1 flex-col justify-start px-3 pb-8',
                    // xl
                    'xl:px-8',
                    // md
                    'md:left-center md:w-1/2 md:justify-center md:px-16',
                    // sm
                    'sm:px-8',
                )}
                onSubmit={submit}
            >
                <span className="text-left text-xl leading-[110%] md:text-3xl md:leading-[120%]">
                    Войдите, чтобы воспользоваться преимуществами программы лояльности
                </span>
                {errors && <div className="mt-8 text-left text-error">{errors.credentials || errors.unknown}</div>}
                <div className="mt-8 flex flex-col md:pr-14">
                    <label htmlFor="email" className="text-left leading-[110%]">
                        Введите вашу электронную почту
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        className={`input mt-2 ${errors?.credentials ? 'input-error' : ''}`}
                    />
                </div>

                <div className="mt-3 flex flex-col md:pr-14">
                    <label htmlFor="password" className="text-left leading-[110%]">
                        Введите ваш пароль
                    </label>
                    <div className="relative mt-2 inline-flex text-left">
                        <input
                            type={`${passwordVisible ? 'text' : 'password'}`}
                            onChange={({ target }) => setPassword(target.value)}
                            id="password"
                            value={password}
                            className={`input relative h-[50px] w-full ${errors?.credentials ? 'input-error' : ''}`}
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

                <div className="mt-6 flex flex-col gap-4 sm:mt-8 md:mt-10 md:flex-row">
                    <Button primary>Войти</Button>
                    <Button type="button">Забыли пароль?</Button>
                </div>
            </form>
            <div className="min-h-[50vh] w-full flex-1 md:w-1/2 md:py-3 md:pr-3">
                <div className="h-full bg-cover" style={{ backgroundImage: `url(${LoginImageURL})` }}></div>
            </div>
        </div>
    );
};
