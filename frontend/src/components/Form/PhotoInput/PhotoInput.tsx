import { ChangeEvent, ReactNode, useRef, useState } from 'react';
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from 'react-hook-form';
import { ErrorMessage, UploadFileScopeEnum, api } from '../../../api';
import { PHOTO_IMAGE_ACCEPT, validatePhotoFile } from './PhotoInput.utils';

import { Button } from '../../Button';
import { DEFAULT_API_ERROR_MSG } from '../../../api/constants';
import { ReactComponent as EditSVG } from '../../../assets/edit.svg';
import { FormErrorMessage } from '../FormErrorMessage';
import Modal from '../../Modal';
import { ReactComponent as PlusSquareSVG } from '../../../assets/plus-square.svg';
import { Spinner } from '../../Spinner';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';

interface PhotoInputProps<TFieldValues extends FieldValues> {
    scope: UploadFileScopeEnum;
    name: FieldPath<TFieldValues>;
    rules?: RegisterOptions;
    className?: string;
    control: Control<TFieldValues>;
}

export const PhotoInput = <TFieldValues extends FieldValues = FieldValues>(props: PhotoInputProps<TFieldValues>) => {
    const [previewModalIsVisible, setPreviewModalIsVisible] = useState(false);

    const { scope, control, name, rules } = props;

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
                <InputContainer>
                    <button type="button" className="h-full w-full" onClick={() => setPreviewModalIsVisible(true)}>
                        <img alt="Товар" src={field.value} className="h-full w-full object-contain" />
                    </button>
                    <button
                        type="button"
                        className="bg-black-transparent-50% absolute right-0 top-0 p-2"
                        onClick={() => photoInputRef.current?.click()}
                    >
                        <EditSVG className="stroke-primary h-6 w-6" />
                    </button>
                </InputContainer>
            ) : (
                <button type="button" onClick={() => photoInputRef.current?.click()}>
                    <InputContainer>
                        {uploadPhotoIsLoading ? (
                            <div className="absolute-center absolute h-6 w-6  ">
                                <Spinner className="h-6 w-6" />
                            </div>
                        ) : (
                            <PlusSquareSVG className="stroke-primary absolute-center absolute h-6 w-6" />
                        )}
                    </InputContainer>
                </button>
            )}
            <FormErrorMessage error={fieldState.error} />
            <Modal
                id="PhotoInput"
                size="md"
                isOpen={previewModalIsVisible}
                closeModal={() => setPreviewModalIsVisible(false)}
            >
                <Modal.Body>
                    {previewModalIsVisible && (
                        <div className="flex flex-col gap-6">
                            <img alt="Товар" src={field.value} className="h-[500px] w-full object-contain" />
                            <div className="flex gap-4">
                                <Button type="button" onClick={() => setPreviewModalIsVisible(false)}>
                                    Закрыть
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

interface InputContainerProps {
    children: ReactNode;
}

const InputContainer = (props: InputContainerProps) => {
    const { children } = props;
    return (
        <div className="relative h-[110px] w-[110px] border-2 border-dotted border-black bg-white dark:border-white dark:bg-black">
            {children}
        </div>
    );
};
