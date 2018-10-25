import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Switch, Route,/*, Link*/ 
Redirect} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

import { categoriesActions } from './features/categories';
import Navigation from './components/navigation';
import { Footer } from './components/footer';
import { postsActions } from './features/posts';
import Posts from './features/posts/components/posts';
import { Post } from './features/posts/components';

interface Props {
  store: Store<any>;
  history: History;
}

const User = (props) => {
  return ( <h2>Wellcome user {props.match.params.username} </h2> )
}

export class App extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.store.dispatch(categoriesActions.fetchCategiries.request());
    this.props.store.dispatch(postsActions.fetchPosts.request())
  }
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Navigation />
            {/* <Posts /> */}
            <div>
              <Switch>
                <Route path="/" exact render={() => (<Redirect to="/posts"/>)}/>
                <Route path="/posts" exact strict component={Posts}/>
                <Route path="/posts/:id" exact strict component={Post}/>
                <Route path="/page1/:username" exact strict component={User}/>
                <Redirect from="/" exact to="/posts" />
              </Switch>
            </div>
            <Footer />          
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
