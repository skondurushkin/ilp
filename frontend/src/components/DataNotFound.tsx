import { useNavigate } from 'react-router-dom';

export const DataNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center gap-6 pt-10">
            <h1 className="text-h1 text-black dark:text-white">Данные не найдены</h1>
            <p className="text-base text-black dark:text-white">
                Попробуйте перезагрузить страницу и повторить попытку
            </p>
            <button className="btn" onClick={() => navigate(0)}>
                Обновить
            </button>
        </div>
    );
};
