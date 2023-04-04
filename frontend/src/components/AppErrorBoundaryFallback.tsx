import type { FallbackProps } from 'react-error-boundary';

export const AppErrorBoundaryFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    console.error(JSON.stringify(error, null, 2));
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg p-6">
            <p>Сервис временно не доступен, попробуйте позже.</p>
            <button className="btn" onClick={resetErrorBoundary}>
                Обновить страницу
            </button>
        </div>
    );
};
