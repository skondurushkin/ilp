import { ErrorMessage, api } from '../../api';

import { Button } from '../../components/Button';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';

export const DownloadWriteOffsCsvButton = () => {
    const { mutate: downloadWriteOffsCsv, isLoading: isLoading } = useMutation(
        async () => {
            const res = await api.admin.downloadWriteOffsCsv();
            return res;
        },
        {
            onSuccess: (data) => {
                saveAs(data, `Выгрузка по заказам от ${new Date().toLocaleDateString('ru-RU')}.csv`, { autoBom: true });
            },
            onError: (err: ErrorMessage) => {
                toast.error(err?.message ?? 'Ошибка');
            },
        },
    );

    return (
        <Button primary disabled={isLoading} onClick={() => downloadWriteOffsCsv()}>
            Выгрузить в CSV
        </Button>
    );
};
