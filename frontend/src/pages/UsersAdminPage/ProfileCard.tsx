import { ReactComponent as EditSVG } from '../../assets/edit.svg';
import { Link } from 'react-router-dom';
import { TypedLink } from '../../router';

interface ProfileCardProps {
    id: number;
    fio: string;
    email: string;
    phone: string;
    avatarLink: string;
    jobPosition: string;
    city: string;
    country: string;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { id, fio, avatarLink, jobPosition, country, city, email, phone } = props;

    return (
        <div className="flex w-full flex-col justify-between gap-6 bg-black p-6">
            <div className="flex justify-between">
                <p className="break-words text-base text-white">{fio}</p>
                <TypedLink
                    className="h-4 w-4"
                    to="/admin/users/:userId"
                    params={{
                        userId: id.toString(),
                    }}
                >
                    <EditSVG className="stroke-primary" />
                </TypedLink>
            </div>
            <div className="flex gap-4">
                <TypedLink
                    className="bg-gray flex h-[120px] w-[120px] shrink-0"
                    to="/admin/users/:userId"
                    params={{
                        userId: id.toString(),
                    }}
                >
                    <img src={avatarLink} alt={fio} className="h-full w-full bg-white" />
                </TypedLink>
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