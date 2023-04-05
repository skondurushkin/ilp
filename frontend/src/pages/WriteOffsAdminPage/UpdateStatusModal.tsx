import { ErrorMessage, UpdateWriteOffRequest, WriteOffStatus, api } from '../../api';
import { FormInput, FormSelect, FormSelectOption } from '../../components/Form';

import Modal from '../../components/Modal';
import { PublicModalProps } from '../../components/Modal/Modal';
import { WriteOffStatusName } from '../../modules/loyalty';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import validationRules from '../../utils/validationRules';

export interface ReadonlyUpdateWriteOffRequest extends UpdateWriteOffRequest {
    id: number;
    date: string;
    articleName: string;
}

export interface UpdateStatusModalProps extends PublicModalProps {
    defaultValues: ReadonlyUpdateWriteOffRequest;
}

export const UpdateStatusModal = (props: UpdateStatusModalProps) => {
    const { defaultValues, isOpen, close } = props;

    const { control, handleSubmit, formState, reset } = useForm<ReadonlyUpdateWriteOffRequest>({
        defaultValues,
    });

    const onSubmit = async (data: ReadonlyUpdateWriteOffRequest) => {
        try {
            await api.admin.updateWriteOff({
                writeoffId: defaultValues.id,
                updateWriteOffRequest: data,
            });
            reset();
            toast('Статус заказа изменен');
            close();
        } catch (err) {
            toast((err as ErrorMessage).message ?? 'Ошибка');
        }
    };

    const statusOptions = useMemo<FormSelectOption[]>(() => {
        return Object.values(WriteOffStatus).map((status) => ({
            value: status,
            label: WriteOffStatusName[status as WriteOffStatus],
        }));
    }, []);

    return (
        <Modal isOpen={isOpen} close={close} size="sm">
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <h1 className="text-h1 text-white">Изменение статуса</h1>
                        <div className="flex flex-col gap-3">
                            <FormInput
                                readOnly
                                control={control}
                                name="date"
                                label="Дата заказа"
                                labelClassName="text-white"
                            />
                            <FormInput
                                readOnly
                                control={control}
                                name="articleName"
                                label="Приз"
                                labelClassName="text-white"
                            />
                            <FormSelect
                                control={control}
                                name="status"
                                label="Статус"
                                labelClassName="text-white"
                                rules={{
                                    required: validationRules.required,
                                }}
                                options={statusOptions}
                            />
                        </div>
                        <div className="flex gap-4">
                            <button type="submit" className="btn" disabled={formState.isSubmitting}>
                                Сохранить
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => close()}>
                                Отменить
                            </button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};
