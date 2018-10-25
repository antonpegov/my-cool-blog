import * as postsActions from './actions';
import * as postsSelectors from './selectors';
import postsReducer, { State as PostsState, Action as PostsAction } from './reducer';
// export * from './epics';

export {
  postsReducer,
  postsActions,
  postsSelectors,
  PostsState,
  PostsAction,
};