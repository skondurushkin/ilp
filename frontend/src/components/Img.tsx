import { DetailedHTMLProps } from 'react';

export const buildApiImageUrl = (imageLink: string) => {
    return `${window.location.origin}/api/ilp/file/${imageLink}`;
};

interface ImgProps extends DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string;
    alt: string;
}

export function Img(props: ImgProps) {
    const { src, alt, ...rest } = props;

    return <img src={buildApiImageUrl(src)} alt={alt} {...rest} />;
}
