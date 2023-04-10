import { plural } from '../../utils/plural';

interface UserBalanceCardProps {
    balance: number;
}

export const UserBalanceCard = (props: UserBalanceCardProps) => {
    const { balance } = props;

    return (
        <div className="flex flex-grow-0 flex-col gap-4 overflow-ellipsis bg-black p-6">
            <div className="text-gray text-base leading-4">Баланс</div>
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end">
                <span className="text-primary text-5xl xl:text-7xl">{balance}</span>
                <span className="text-xl text-white xl:text-3xl">{plural(balance, ['вольт', 'вольта', 'вольт'])}</span>
            </div>
        </div>
    );
};
