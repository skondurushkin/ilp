import { ReactComponent as EditSVG } from '../assets/edit.svg';
import { Img } from './Img';
import { Link } from 'react-router-dom';
import { RouteLink } from '../components/RouteLink';

interface UserProfileCardProps {
    id: number;
    fio?: string;
    email: string;
    phone: string;
    avatarLink: string;
    jobPosition: string;
    city: string;
    country: string;
    showEditLink?: boolean;
}

export const UserProfileCard = (props: UserProfileCardProps) => {
    const { id, fio, avatarLink, jobPosition, country, city, email, phone, showEditLink = true } = props;

    return (
        <div className="flex w-full flex-col justify-between gap-6 bg-black p-6">
            {!!fio && (
                <div className="flex justify-between">
                    <p className="text-base text-white">{fio}</p>
                    {showEditLink && (
                        <RouteLink
                            className="h-4 w-4"
                            to="/admin/users/:userId"
                            params={{
                                userId: id.toString(),
                            }}
                        >
                            <EditSVG className="stroke-primary" />
                        </RouteLink>
                    )}
                </div>
            )}
            <div className="flex gap-4">
                <RouteLink
                    className="bg-gray flex h-[120px] w-[120px] shrink-0"
                    to="/admin/users/:userId"
                    params={{
                        userId: id.toString(),
                    }}
                >
                    <Img src={avatarLink} alt={fio ?? 'Аватар'} className="h-full w-full bg-black object-contain" />
                </RouteLink>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-white">{jobPosition}</p>
                        <p className="text-white">{`${country}, ${city}`}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Link to={`mailto:${email}`} className="text-white">
                            {email}
                        </Link>
                        <Link to={`tel:${phone}`} className="text-white">
                            {phone}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
