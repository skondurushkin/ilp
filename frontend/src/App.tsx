import { QueryClient, QueryClientProvider } from 'react-query';

import { AppErrorBoundaryFallback } from './components/AppErrorBoundaryFallback';
import { AppRouter } from './router';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import { useTheme } from './theme';

const queryClient = new QueryClient();

function App() {
    const theme = useTheme();

    return (
        <ErrorBoundary FallbackComponent={AppErrorBoundaryFallback}>
            <QueryClientProvider client={queryClient}>
                <ToastContainer theme={theme === 'dark' ? 'light' : 'dark'} position="bottom-right" />
                <AppRouter />
            </QueryClientProvider>
        </ErrorBoundary>
    );
}

export default App;
