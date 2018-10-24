import { createStore, applyMiddleware, compose } from 'redux';
import { /*createBrowserHistory,*/ createHashHistory } from 'history';
import { logger } from 'redux-logger';
import { rootReducer, RootState } from './root-reducer';
import { connectRouter, routerMiddleware as createRouterMiddleware } from 'connected-react-router'
// import { createEpicMiddleware } from 'redux-observable';
// import { rootEpic } from './root-epic';

const composeEnhancers = (
  // process.env.NODE_ENV === 'development' &&
  window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

// export const epicMiddleware = createEpicMiddleware(rootEpic);
export const browserHistory = createHashHistory();
export const routerMiddleware = createRouterMiddleware(browserHistory);

function configureStore(initialState?: RootState) {
  // configure middlewares
  const middlewares = [
    // epicMiddleware,
    logger,
    routerMiddleware,
  ];
  // compose enhancers
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );
  // create store
  return createStore(
    connectRouter(browserHistory)(rootReducer),
    initialState!,
    enhancer
  );
}

// pass an optional param to rehydrate state on app start
export const store = configureStore();

// export store singleton instance
export default store;
