import * as React from 'react';
import './App.css';

import withFetch from "./hoc/withFetch";
import SwapList from "./SwapList";

class App extends React.Component<any, any> {

  public componentDidMount() {
    const { initialize } = this.props;
    initialize();
  }
  public render() {
    const { fetchState, isLoading } = this.props;
    // tslint:disable-next-line:no-console
    console.log(fetchState.data, isLoading);
    return (
      <div className="App">
        <button onClick={this.onRefresh}>refresh</button>
        <SwapList data={fetchState.data} />
        <button onClick={this.onAppend}>append</button>
      </div>
    );
  }

  private onRefresh = () => {
    const { refresh } = this.props;
    refresh();
  }

  private onAppend = () => {
    const { append } = this.props;
    append();
  }
}

export default withFetch("https://swapi.co/api/planets/")(App);
