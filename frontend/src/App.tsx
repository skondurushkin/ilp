import { useQuery } from 'react-query';
import { isNil } from 'lodash';
import './App.css';
import { ReactComponent as LoadingSVG } from './assets/loading.svg';
import { api } from './api';

function App() {
    const {
        data: hello,
        isLoading,
        refetch,
    } = useQuery('hello', api.getHello, {
        refetchOnWindowFocus: false,
        enabled: false, // disable this query from automatically running
    });

    const renderButton = hello && !isLoading;

    return (
        <div>
            {renderButton && <button onClick={() => refetch()}>Get Hello</button>}
            <div className="App">{isLoading ? <LoadingSVG /> : hello?.greeting}</div>
        </div>
    );
}

export default App;
