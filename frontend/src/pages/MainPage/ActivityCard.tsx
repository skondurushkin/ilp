import { ButtonSkeleton, Skeleton, SkeletonContainer } from '../../components/Skeleton';

import { ActivityResponse } from '../../api';
import { Box } from '../../components/Box';
import { Button } from '../../components/Button';
import { ReactElement } from 'react';
import { ReactComponent as TokenIcon } from '../../assets/token.svg';
import { VerticalBrackets } from '../../components/VerticalBrackets';
import { twMerge } from 'tailwind-merge';

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
    return (
        <>
            <VerticalBrackets size="2" className="self-center">
                <div className="flex items-center gap-1 text-2xl md:text-3xl">
                    +{activity.price}
                    <TokenIcon className="h-5 w-5" />
                </div>
            </VerticalBrackets>
            <div className="mt-2 grow self-center text-center">{activity.name}</div>
            <Button className="mt-4" primary>
                Запросить вольты
            </Button>
            <Button className="mt-2">Подробнее</Button>
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
