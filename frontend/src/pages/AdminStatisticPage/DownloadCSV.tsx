import { ErrorMessage, api } from '../../api';

import { Button } from '../../components/Button';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';

export const DownloadBalanceCsvButton = () => {
    const { mutate: downloadBalanceCsv, isLoading: isLoading } = useMutation(
        async () => {
            const res = await api.admin.downloadBalanceCsv();
            return res;
        },
        {
            onSuccess: (data) => {
                saveAs(
                    new Blob([data], { type: 'text/csv;charset=utf-8' }),
                    `Выгрузка по движению балансов от ${new Date().toLocaleDateString('ru-RU')}.csv`,
                    {
                        autoBom: true,
                    },
                );
            },
            onError: (err: ErrorMessage) => {
                toast.error(err?.message ?? 'Ошибка');
            },
        },
    );

    return (
        <Button className="ml-auto" size="small" primary disabled={isLoading} onClick={() => downloadBalanceCsv()}>
            Выгрузить в CSV
        </Button>
    );
};
