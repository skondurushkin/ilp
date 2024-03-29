import { Img } from '../Img';
import { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { useProfileQuery } from '../../modules/loyalty';

export interface ProfileProps {
    className?: string;
}

export interface ProfileData {
    firstName: string;
    lastName: string;
    avatarUrl?: string;
}

export function Profile(props: ProfileProps): ReactElement {
    const { className } = props;

    const query = useProfileQuery();

    const avatarUrl = query.isSuccess ? query.data.avatarLink : undefined;
    const initials = query.isSuccess
        ? `${query.data.fio.firstName.charAt(1).toUpperCase()}${query.data.fio.lastName.charAt(1).toUpperCase()}`
        : '';
    const fullName = query.isSuccess ? `${query.data.fio.firstName} ${query.data.fio.lastName}` : '';

    return (
        <div className={twMerge('flex flex-col items-center', className)}>
            <div className="h-[128px] w-[128px] overflow-hidden rounded-full bg-black leading-[128px] dark:bg-white">
                {avatarUrl && <Img className="h-full w-full object-cover text-center" src={avatarUrl} alt="Аватар" />}
                {!avatarUrl && (
                    <div className="flex h-full w-full items-center justify-center text-6xl text-white dark:text-black">
                        {initials}
                    </div>
                )}
            </div>
            <div className="mt-2 text-center">{fullName}</div>
        </div>
    );
}
