import { combineReducers } from 'redux';
import { getType, ActionType } from 'typesafe-actions';
import * as postsActions from './actions';
import { Post, Comment } from './models';

export type Action = ActionType<typeof postsActions>;
export type State = {
  readonly list: Post[];
  readonly ready: boolean;
};
export const initialState: State = {
  list: [],
  ready: false
};

const clone = (input: Array<any> | Object) => JSON.parse(JSON.stringify(input));

export default combineReducers<{}, Action>({
  list: (state = initialState.list, action: Action) => {
    switch (action.type) {
      case getType(postsActions.fetchPosts.success):
        return action.payload.data.length > 0 ? [].concat(clone(state)).concat(clone(action.payload.data)) : state;
      case getType(postsActions.fetchComments.success):
        const comments = action.payload.data as Comment[];
        const postId = comments.length > 0 ? comments[0].postid : undefined;
        return !postId ? state :
          Object.assign({}, state[postId].comments.concat(comments))
      default:
        return state;
    }
  },
  ready: (state = initialState.ready, action: Action) => {
    switch (action.type) {
      case getType(postsActions.fetchPosts.request):
        return false;
      case getType(postsActions.fetchPosts.success):
        return true;
      default:
        return state;
    }
  }
});
