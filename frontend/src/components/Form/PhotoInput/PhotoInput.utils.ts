export const PHOTO_MAX_UPLOAD_SIZE = 5000000 * 1024; // 5 mb
export const PHOTO_IMAGE_ACCEPT = '.jpg, .jpeg, .png';

export const validatePhotoFile = (file: File) => {
    if (file.size > PHOTO_MAX_UPLOAD_SIZE) {
        throw new Error(`Превышен максимальный размер файла в ${PHOTO_MAX_UPLOAD_SIZE} мб`);
    }
    const fileExt = file.name.split('.').pop();
    const accept = PHOTO_IMAGE_ACCEPT.split(', ');

    if (!fileExt || !accept.includes(`.${fileExt}`.toLocaleLowerCase())) {
        throw new Error('Неверный тип файла.');
    }
};
