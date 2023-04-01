import { QueryClient, QueryClientProvider } from 'react-query';

import { AppRouter } from './router';
import { ToastContainer } from 'react-toastify';
import { useTheme } from './theme';

const queryClient = new QueryClient();

function App() {
    const theme = useTheme();
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer theme={theme === 'dark' ? 'light' : 'dark'} position="bottom-right" />
            <AppRouter />
        </QueryClientProvider>
    );
}

export default App;
