import './App.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import AppRouter from './routers/AppRouter';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRouter />
        </QueryClientProvider>
    );
}

export default App;
