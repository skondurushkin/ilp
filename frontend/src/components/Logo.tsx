import { ReactComponent as CompanyLogo } from '../assets/logo.svg';
import { ReactComponent as ProgramLogo } from '../assets/program-logo.svg';
import { ReactElement } from 'react';

export interface LogoProps {
    className?: string;
    hideProgramLogo?: boolean;
}

export function Logo(props: LogoProps): ReactElement {
    const { className, hideProgramLogo } = props;
    return (
        <div className={className}>
            <CompanyLogo className="h-[25px] w-[60px] md:h-[39px] md:w-[93px]" />
            {!hideProgramLogo && <ProgramLogo className="h-[16px] w-[128px] md:h-[18px] md:w-[149px]" />}
        </div>
    );
}
