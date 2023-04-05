import { QueryClient, QueryClientProvider } from 'react-query';

import { AppErrorBoundaryFallback } from './components/AppErrorBoundaryFallback';
import { AppRouter } from './router';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ReactModal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import { useTheme } from './theme';

const queryClient = new QueryClient();

ReactModal.setAppElement('body');

function App() {
    const theme = useTheme();

    return (
        <ErrorBoundary FallbackComponent={AppErrorBoundaryFallback}>
            <QueryClientProvider client={queryClient}>
                <ToastContainer theme={theme === 'dark' ? 'light' : 'dark'} position="bottom-right" />
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}

export default App;
