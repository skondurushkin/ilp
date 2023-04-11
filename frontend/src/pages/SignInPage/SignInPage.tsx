import { ERR_UNAUTHORIZED, useAuthActions } from '../../modules/auth';
import { FormEvent, useState } from 'react';

import { Button } from '../../components/Button';
import { ReactComponent as CrossedEyeSVG } from '../../assets/crossed-eye.svg';
import { ReactComponent as EyeSVG } from '../../assets/eye.svg';
import { Logo } from '../../components/Logo';
import loginImageURL from '../../assets/login-image.jpg';
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
            <Logo
                className="icon-dark md:icon-light absolute left-4 top-6 z-20 sm:left-8 md:left-16 md:top-6 md:block xl:left-8"
                hideProgramLogo
            />
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
                {errors && <div className="text-error mt-8 text-left">{errors.credentials || errors.unknown}</div>}
                <div className="mt-8 flex flex-col md:pr-14">
                    <label htmlFor="email" className="text-left leading-[110%]">
                        Введите вашу электронную почту
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        className={`input mt-2 dark:bg-white dark:text-black ${
                            errors?.credentials ? 'input-error' : ''
                        }`}
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
                            className={`input relative h-[50px] w-full dark:bg-white dark:text-black ${
                                errors?.credentials ? 'input-error' : ''
                            }`}
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

                <Button className="mt-6 sm:mt-8 md:mt-10 md:self-start" primary>
                    Войти
                </Button>
            </form>
            <div className="relative w-full pt-[57%] md:w-1/3 md:pt-0 xl:w-1/2">
                <div className="absolute left-0 top-0 z-10 h-full w-full md:py-3 md:pr-3">
                    <img className="h-full w-full md:w-auto" src={loginImageURL} alt="IT_One" />
                </div>
            </div>
        </div>
    );
};
