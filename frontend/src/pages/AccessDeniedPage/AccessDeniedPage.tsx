import { RouterLink } from '../../components/RouterLink';
import gendalfUrl from './gendalf.jpg';

export const AccessDeniedPage = () => {
    return (
        <div className="flex min-h-full w-full flex-col items-center justify-center">
            <img src={gendalfUrl} alt="Гендальф" />
            <h1 className="text mt-6">Нет доступа для просмотра этой страницы</h1>
            <RouterLink className="mt-5" to="/" presentation="button" primary>
                Вернуться на главную страницу
            </RouterLink>
        </div>
    );
};
