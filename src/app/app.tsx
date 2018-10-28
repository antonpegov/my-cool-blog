import * as React from 'react';
// import * as config from '../config';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { categoriesActions } from './features/categories';
import { Footer } from './components/footer';
import { postsActions } from './features/posts';
import Navigation from './components/navigation';
import Posts from './features/posts/components/posts';
import Post from './features/posts/components/post';

interface Props {
  store: Store<any>;
  history: History;
}
export class App extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.store.dispatch(categoriesActions.fetchCategiries.request());
    this.props.store.dispatch(postsActions.fetchPosts.request({amount: 6}));
  }
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Navigation />
              <Switch>
                <Route path="/" exact={true} render={() => (<Redirect to="/posts"/>)}/>
                <Route path="/posts" exact={true} strict={true} component={Posts}/>
                <Route path="/posts/:id" exact={true} strict={true} component={Post}/>
                <Redirect from="/" exact={true} to="/posts" />
              </Switch>
            <Footer />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
