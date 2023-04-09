import { ReactComponent as FrownIcon } from '../assets/frown.svg';

interface DataNotFoundProps {
    message?: string;
}

export const DataNotFound = (props: DataNotFoundProps) => {
    const { message = 'Пока здесь ничего нет' } = props;

    return (
        <div className="flex flex-col items-center justify-center gap-6 pt-10">
            <FrownIcon />
            <div className="text-gray mt-4">{message}</div>
        </div>
    );
};
