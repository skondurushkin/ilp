import { ActivityResponse, OperationResponseTypeEnum } from '../../api';
import { ButtonSkeleton, Skeleton, SkeletonContainer } from '../../components/Skeleton';

import { Box } from '../../components/Box';
import { Link } from 'react-router-dom';
import { ReactElement } from 'react';
import { VerticalBrackets } from '../../components/VerticalBrackets';
import { Zaps } from '../../components/Zaps';
import { twMerge } from 'tailwind-merge';
import { useConfig } from '../../modules/config';

export interface ActivityCardProps extends ActivityViewProps {
    className?: string;
    skeleton?: never;
}

export interface ActivityCardSkeletonProps {
    className?: string;
    activity?: never;
    skeleton: true;
}

export function ActivityCard(props: ActivityCardProps | ActivityCardSkeletonProps): ReactElement {
    const { className, ...rest } = props;
    return (
        <Box className={twMerge('text-white', className)}>
            {rest.skeleton && <SkeletonView />}
            {rest.activity && <ActivityView {...rest} />}
        </Box>
    );
}

interface ActivityViewProps {
    activity: ActivityResponse;
}

function ActivityView(props: ActivityViewProps): ReactElement {
    const { activity } = props;
    const config = useConfig();
    const requestTokensUrl = config ? `mailto:${config.adminEmail}?subject=${config.requestTokenEmailSubject}` : '#';
    return (
        <>
            <VerticalBrackets size="2" className="self-center">
                <Zaps
                    className="text-h1 px-0.5 md:px-2"
                    zapClassName="h-5 w-5"
                    type={OperationResponseTypeEnum.Accrual}
                    amount={activity.amount}
                />
            </VerticalBrackets>
            <div className="mt-2 grow self-center text-center">{activity.name}</div>
            <Link className="btn btn-primary mt-4" to={requestTokensUrl}>
                Запросить вольты
            </Link>
            <Link className="btn mt-2" to={activity.infoLink} target="_blank">
                Подробнее
            </Link>
        </>
    );
}

export function SkeletonView(): ReactElement {
    return (
        <SkeletonContainer>
            <Skeleton className="mx-auto h-14 w-1/3" />
            <Skeleton className="mx-auto mt-3 h-4 w-4/5" />
            <Skeleton className="mx-auto mt-2 h-4 w-2/5" />
            <ButtonSkeleton className="mt-4 w-full" />
            <ButtonSkeleton className="mt-2 w-full" />
        </SkeletonContainer>
    );
}
