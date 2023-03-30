import { Layout } from '../../components/Layout';
import { TypedLink } from '../../router';
import obivanKenobiUrl from './obi-van-kenobi.jpg';

export const NotFoundPage = () => {
    return (
        <Layout>
            <div className="flex min-h-full w-full flex-col items-center justify-center">
                <img src={obivanKenobiUrl} alt="Оби-Ван Кеноби" />
                <h1 className="mt-6">Это не та страница, которую вы ищете</h1>
                <TypedLink className="mt-5" to="/" presentation="button" primary>
                    Вернуться на главную страницу
                </TypedLink>
            </div>
        </Layout>
    );
};
