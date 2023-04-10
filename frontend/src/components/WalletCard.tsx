import { ReactElement, useMemo } from 'react';
import { Skeleton, SkeletonContainer } from './Skeleton';

import { TypedLink } from '../router';
import { WalletResponse } from '../api';
import { Zaps } from './Zaps';
import loyaltyProgramCardUrl from '../assets/loyalty-program-card.png';
import { plural } from '../utils/plural';
import { twMerge } from 'tailwind-merge';

export interface WalletCardProps extends WalletViewProps {
    className?: string;
    skeleton?: never;
}

export interface WalletCardSkeletonProps extends SkeletonViewProps {
    className?: string;
    wallet?: never;
}

export function WalletCard(props: WalletCardProps | WalletCardSkeletonProps): ReactElement {
    const { className, ...rest } = props;
    let view: ReactElement;
    if (rest.skeleton) {
        view = <SkeletonView {...rest} />;
    } else if (rest.wallet.operations.length === 0) {
        view = <EmptyWalletView {...rest} />;
    } else {
        view = <WalletView {...rest} />;
    }
    return (
        <div
            className={twMerge(
                'text-gray flex flex-col-reverse justify-between gap-3 overflow-hidden bg-black p-4 sm:flex-row sm:gap-0 sm:p-6',
                className,
            )}
        >
            <div className="flex flex-col sm:w-1/2 sm:items-start">{view}</div>
            <div className="relative sm:w-1/2 sm:py-6 md:py-0">
                <img
                    className="relative w-full rounded-lg shadow-[0_4px_160px_-10px_rgba(170,230,50,0.8)] sm:-right-[10%] sm:h-full sm:w-auto md:-right-[15%] 2xl:-right-[20%]"
                    src={loyaltyProgramCardUrl}
                    alt="Карта лояльности"
                />
            </div>
        </div>
    );
}

interface WalletViewProps {
    wallet: WalletResponse;
    extended?: boolean;
}

function EmptyWalletView(props: WalletViewProps) {
    const { extended } = props;
    return (
        <>
            <div className="text-xs leading-4">Мой баланс</div>
            <div className="mt-2 text-xl md:text-2xl">
                <span className="text-primary">0</span> <span className="text-white">вольт</span>
            </div>
            {!extended && <div className="pt-16" />}
            {extended && (
                <>
                    <div className="mt-6 grow text-2xl md:text-3xl">
                        Учавствуй в <span className="text-white">активностях</span>
                        <br />и добывай <span className="text-white">вольты</span>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        <a className="btn btn-primary w-full sm:w-auto" href="/#activities">
                            Начать добычу вольт
                        </a>
                        <TypedLink className="w-full sm:w-auto" presentation="button" to="/rules">
                            Ознакомиться с правилами
                        </TypedLink>
                    </div>
                </>
            )}
        </>
    );
}

function WalletView(props: WalletViewProps): ReactElement {
    const { wallet, extended } = props;

    const amountLength = useMemo(
        () => Math.max(...wallet.operations.map((op) => op.amount.toString().length)),
        [wallet],
    );

    return (
        <>
            <div className="text-xs leading-4">Мой баланс</div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <span className="text-primary text-7xl">{wallet.balance}</span>
                <span className="text-3xl text-white">{plural(wallet.balance, ['вольт', 'вольта', 'вольт'])}</span>
            </div>
            <div className="text-gray mt-3 text-sm leading-[110%] md:text-base">
                Получай их за активности и выбирай призы
            </div>
            {extended && (
                <>
                    <div className="text-gray mt-4 text-xs leading-4 sm:hidden">История баланса</div>
                    <ul className="mt-2 space-y-1">
                        {limit(wallet.operations, 3).map((item) => (
                            <li key={item.id} className="text flex items-baseline gap-2 text-white">
                                <Zaps
                                    className="items-baseline text-base font-bold leading-[110%]"
                                    type={item.type}
                                    amount={item.amount}
                                    length={amountLength}
                                />
                                {item.name}
                            </li>
                        ))}
                    </ul>
                    <TypedLink to="/profile" hash="balance-history" className="mt-4 text-white underline md:mt-6">
                        Посмотреть всю историю
                    </TypedLink>
                </>
            )}
        </>
    );
}

interface SkeletonViewProps {
    skeleton: true;
    extended?: boolean;
}

function SkeletonView(props: SkeletonViewProps): ReactElement {
    const { extended } = props;
    return (
        <SkeletonContainer className="w-full">
            <Skeleton className="max-w-4 h-4 w-1/5" />
            <Skeleton className="max-w-5 mt-2 h-20 w-3/5" />
            <Skeleton className="max-w-6 mt-3 h-4 w-2/3" />
            {extended && (
                <>
                    <Skeleton className="max-w-4 mt-4 h-4 w-1/4" />
                    <Skeleton className="mt-2 h-4 w-4/5" />
                    <Skeleton className="mt-2 h-4 w-1/2" />
                    <Skeleton className="mt-2 h-4 w-3/6" />
                    <Skeleton className="mt-6 h-4 w-1/2" />
                </>
            )}
        </SkeletonContainer>
    );
}

function limit<T>(arr: T[], limit: number): T[] {
    if (arr.length <= limit) {
        return arr;
    }
    return arr.slice(0, limit);
}
