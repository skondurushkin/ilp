import { ChangeEvent, MouseEventHandler, ReactNode, useRef } from 'react';
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from 'react-hook-form';
import { ErrorMessage, UploadFileScopeEnum, api } from '../../../api';
import { PHOTO_IMAGE_ACCEPT, validatePhotoFile } from './PhotoInput.utils';

import { DEFAULT_API_ERROR_MSG } from '../../../api/constants';
import { FormErrorMessage } from '../FormErrorMessage';
import { ReactComponent as PlusSquareSVG } from '../../../assets/plus-square.svg';
import { Spinner } from '../../Spinner';
import { ReactComponent as XSquareVG } from '../../../assets/x-square.svg';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';

interface PhotoInputProps<TFieldValues extends FieldValues> {
    scope: UploadFileScopeEnum;
    name: FieldPath<TFieldValues>;
    entityId?: number;
    rules?: RegisterOptions;
    className?: string;
    control: Control<TFieldValues>;
}

export const PhotoInput = <TFieldValues extends FieldValues = FieldValues>(props: PhotoInputProps<TFieldValues>) => {
    const { scope, entityId, control, name, rules } = props;

    const { field, fieldState } = useController({
        name,
        control,
        rules,
    });

    const photoInputRef = useRef<HTMLInputElement | null>(null);

    const { mutateAsync: uploadPhoto, isLoading: uploadPhotoIsLoading } = useMutation<
        void,
        ErrorMessage,
        ChangeEvent<HTMLInputElement>
    >(
        async (event) => {
            if (event.target.files?.length) {
                const file = event.target.files[0];

                validatePhotoFile(file);

                const uploadedFile = await api.files.uploadFile({
                    scope,
                    id: entityId,
                    file,
                });

                field.onChange(uploadedFile.link);
            }
        },
        {
            onError: (error, event) => {
                toast.error((error as ErrorMessage)?.message ?? DEFAULT_API_ERROR_MSG);
                event.target.value = '';
            },
        },
    );

    return (
        <div className="flex flex-col items-start justify-center gap-4">
            <input
                ref={photoInputRef}
                type="file"
                className="hidden"
                multiple={false}
                accept={PHOTO_IMAGE_ACCEPT}
                onChange={uploadPhoto}
            />
            {field.value ? (
                <InputButton onClick={() => field.onChange(null)}>
                    <img alt="Товар" src={field.value} className="h-full w-full object-contain" />
                    <XSquareVG className="fill-error absolute-center h-6 w-6" />
                </InputButton>
            ) : (
                <InputButton onClick={() => photoInputRef.current?.click()}>
                    {uploadPhotoIsLoading ? (
                        <div className="absolute-center absolute h-6 w-6  ">
                            <Spinner className="h-6 w-6" />
                        </div>
                    ) : (
                        <PlusSquareSVG className="stroke-primary absolute-center absolute h-6 w-6" />
                    )}
                </InputButton>
            )}
            <FormErrorMessage error={fieldState.error} />
        </div>
    );
};

interface InputButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
}

const InputButton = (props: InputButtonProps) => {
    const { onClick, children } = props;
    return (
        <button
            type="button"
            className="relative h-[110px] w-[110px] border-2 border-dotted border-black bg-white dark:border-white dark:bg-black"
            onClick={onClick}
        >
            {children}
        </button>
    );
};
