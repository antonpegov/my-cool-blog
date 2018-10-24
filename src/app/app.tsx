import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

import ListView from './components/list-view';
import Counter from './components/counter';

interface Props {
  store: Store<any>;
  history: History;
}

const User = (props) => {
  return ( <h2>Wellcome user {props.match.params.username} </h2> )
}

export class App extends React.Component<Props, {}> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
          <header>
            <nav>
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/page1'>Page1</Link></li>
                <li><Link to='/page1/Anton'>Page1/:username</Link></li>
              </ul>
            </nav>
          </header>
          <Switch>
            <Route path="/" exact strict render={() => (
              <ListView title="List of counters on '/' :" >
                <Counter />
                <Counter startWith={31} />
              </ListView>
            )}/>
            <Route path="/page1" exact strict render={() => (
              <ListView title="List of counters on '/page1/':" >
                <Counter startWith={200} />
                <Counter />
              </ListView>
            )}/>
            <Route path="/page1/:username" exact strict component={User}/>
          </Switch>
        </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
