import { ReactComponent as FrownIcon } from '../assets/frown.svg';

export const DataNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6 pt-10">
            <FrownIcon />
            <div className="text-small text-gray mt-3">Пока здесь ничего нет</div>
        </div>
    );
};
