import { ReactElement } from 'react';

export interface ImageGalleryProps {
    className?: string;
    imgs: { src: string; alt: string }[];
}

export function ImageGallery(props: ImageGalleryProps): ReactElement {
    const { className, imgs } = props;
    return (
        <div className={className}>
            {imgs.map((img) => (
                <img key={img.src} src={img.src} alt={img.alt} />
            ))}
        </div>
    );
}
