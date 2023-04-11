import { Box } from '../../../components/Box';
import { ReactComponent as FrownIcon } from '../../../assets/frown.svg';
import { Link } from 'react-router-dom';
import { ReactElement } from 'react';
import { RouterLink } from '../../../components/RouterLink';

export function EmptyOperationHistory(): ReactElement {
    return (
        <Box className="text-gray items-center px-3 pt-6 sm:pb-11 sm:pt-8 md:pb-9 md:pt-12">
            <FrownIcon />
            <div className="text-small text-gray mt-3">Пока здесь ничего нет</div>
            <div className="mt-6 flex flex-col md:mt-10">
                <div className="text-center text-2xl md:text-3xl">
                    Учавствуй в <span className="text-white">активностях</span> и добывай{' '}
                    <span className="text-white">вольты</span>
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row md:px-10">
                    <Link className="btn btn-primary w-full sm:w-auto sm:grow" to="/#activities">
                        Начать добычу вольт
                    </Link>
                    <RouterLink className="w-full sm:w-auto sm:grow" presentation="button" to="/rules">
                        Ознакомиться с правилами
                    </RouterLink>
                </div>
            </div>
        </Box>
    );
}
