import { PHOTO_IMAGE_ACCEPT, PHOTO_MAX_UPLOAD_SIZE } from './PhotoInput.utils';

export const PhotoRequirements = () => {
    return (
        <div>
            <p className="text-gray">Формат картинки {PHOTO_IMAGE_ACCEPT}</p>
            <p className="text-gray">Размер картинки не должен превышать {PHOTO_MAX_UPLOAD_SIZE / 1024000000} Мбайт</p>
        </div>
    );
};
