import { RouterLink } from '../../components/RouterLink';
import obivanKenobiUrl from './obi-van-kenobi.jpg';

export const NotFoundPage = () => {
    return (
        <div className="flex min-h-full w-full flex-col items-center justify-center">
            <img src={obivanKenobiUrl} alt="Оби-Ван Кеноби" />
            <h1 className="text mt-6">Это не та страница, которую вы ищете</h1>
            <RouterLink className="mt-5" to="/" presentation="button" primary>
                Вернуться на главную страницу
            </RouterLink>
        </div>
    );
};
