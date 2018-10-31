import React from 'react';
import './App.css';

import SwapList from "./SwapList";
import useFetch from "./use/useFetch";

// 

const App = () => {
  const { useEffect } = (React as any);
  const fetchAPI = async (next: string | null) => {
    const response: any = await fetch(next ? next : "https://swapi.co/api/planets/");
    return await response.json();
  };

  const { initialize, append, refresh, fetchState } = useFetch(fetchAPI);

  useEffect(() => {
    if (fetchState.next === null) {
      initialize();
    }
  })

  // tslint:disable-next-line:no-console
  console.log(fetchState);

  return (
    <div className="App">
      <button onClick={refresh}>refresh</button>
      <SwapList data={fetchState.data} />
      <button onClick={append}>append</button>
    </div>
  );
}

export default App;
