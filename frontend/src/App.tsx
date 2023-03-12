import { useQuery, useQueryClient } from "react-query";
import { isNil } from "lodash";
import "./App.css";
import { ReactComponent as LoadingSVG } from "./assets/loading.svg";

function App() {
  const getHello = async () => {
    const res = await fetch("http://localhost:3000/api/ilp/hello");
    return res.json();
  };

  const {
    data: hello,
    isLoading,
    refetch,
  } = useQuery("hello", getHello, {
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  const renderButton = isNil(hello) && !isLoading;

  return (
    <div>
      {renderButton && <button onClick={() => refetch()}>Get Hello</button>}
      <div className="App">{isLoading ? <LoadingSVG /> : hello}</div>
    </div>
  );
}

export default App;
