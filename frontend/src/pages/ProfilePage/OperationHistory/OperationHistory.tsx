import { ButtonSkeleton, Skeleton, SkeletonContainer } from '../../../components/Skeleton';

import { AccrualsTable } from './AccrualsTable';
import { Box } from '../../../components/Box';
import { Chips } from '../../../components/Chips';
import { ReactComponent as FrownIcon } from '../../../assets/frown.svg';
import { Link } from 'react-router-dom';
import { OperationResponseTypeEnum } from '../../../api';
import { ReactElement } from 'react';
import { TableSkeletonBody } from './HistoryTable';
import { TypedLink } from '../../../router';
import { WriteOffsTable } from './WriteOffsTable';

export interface OperationHistoryProps {
    operationType: OperationResponseTypeEnum;
    onChangeOperationType: (type: OperationResponseTypeEnum) => void;
}

export function OperationHistory(props: OperationHistoryProps): ReactElement {
    const { operationType, onChangeOperationType } = props;

    return (
        <div>
            <Chips
                options={
                    [
                        { label: 'пополнение', value: 'accrual' },
                        { label: 'списание', value: 'writeOff' },
                    ] as const
                }
                value={operationType}
                onChange={onChangeOperationType}
            />
            <Box className="mt-4 md:mt-8">
                {operationType === 'accrual' && <AccrualsTable />}
                {operationType === 'writeOff' && <WriteOffsTable />}
            </Box>
        </div>
    );
}

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
                    <TypedLink className="w-full sm:w-auto sm:grow" presentation="button" to="/rules">
                        Ознакомиться с правилами
                    </TypedLink>
                </div>
            </div>
        </Box>
    );
}

export function OperationHistorySkeleton(): ReactElement {
    return (
        <SkeletonContainer>
            <div className="flex gap-2">
                <ButtonSkeleton className="w-1/4" />
                <ButtonSkeleton className="w-1/4" />
            </div>
            <Box className="mt-4">
                <TableSkeletonBody />
            </Box>
            <Skeleton className="mt-4 h-8 w-4/5 self-center" />
        </SkeletonContainer>
    );
}
