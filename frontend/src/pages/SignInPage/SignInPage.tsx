import { ERR_UNAUTHORIZED, useAuthActions } from '../../modules/auth';
import { FormEvent, useState } from 'react';

import { Button } from '../../components/Button';
import { ReactComponent as CrossedEyeSVG } from '../../assets/crossed-eye.svg';
import { ReactComponent as EyeSVG } from '../../assets/eye.svg';
import LoginImageURL from '../../assets/login-image.svg';
import { ReactComponent as LogoDark } from '../../assets/logo-dark.svg';
import { ReactComponent as LogoLight } from '../../assets/logo-light.svg';

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
        <div className="relative flex h-screen flex-col-reverse justify-end gap-8 sm:gap-10 xl:flex-row">
            <LogoDark className="absolute left-16 top-6 hidden xl:block" />
            <LogoLight className="absolute top-6 left-4 sm:left-8 xl:hidden" />
            <form
                className="xl:left-center flex h-full flex-col justify-center px-3 pb-8 sm:px-8 xl:w-1/2 xl:px-16"
                onSubmit={submit}
            >
                <span className="text-left text-xl leading-[110%] xl:text-3xl xl:leading-[120%]">
                    Войдите, чтобы воспользоваться преимуществами программы лояльности
                </span>
                {errors && <div className="mt-8 text-left text-error">{errors.credentials || errors.unknown}</div>}
                <div className="mt-8 flex flex-col xl:pr-14">
                    <label htmlFor="email" className="text-left leading-[110%]">
                        Введите вашу электронную почту
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        className={`focus:green mt-2 h-[50px] border px-3 focus:border-success focus:outline-none
                                ${errors?.credentials ? 'border-error' : ''}
                                `}
                    />
                </div>

                <div className="mt-3 flex flex-col xl:pr-14">
                    <label htmlFor="password" className="text-left leading-[110%]">
                        Введите ваш пароль
                    </label>
                    <div className="relative mt-2 inline-flex text-left">
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

                <div className="mt-6 flex flex-col gap-4 sm:mt-8 xl:mt-10 xl:flex-row">
                    <Button primary>Войти</Button>
                    <Button type="button">Забыли пароль?</Button>
                </div>
            </form>
            <div className="w-full xl:w-1/2 xl:py-3 xl:pr-3">
                <div
                    className="h-full bg-cover pt-[58%] sm:pt-[68%]"
                    style={{ backgroundImage: `url(${LoginImageURL})` }}
                ></div>
            </div>
        </div>
    );
};
