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
  ready: false,
};

const clone = (input: any[]|object) => JSON.parse(JSON.stringify(input));

export default combineReducers<{}, Action>({
  list: (state = initialState.list, action: Action) => {
    let postId: number|undefined;
    let newState: Post[];
    switch (action.type) {
      case getType(postsActions.fetchPosts.success):
        return action.payload.data.length > 0 ? [].concat(clone(state)).concat(clone(action.payload.data)) : state;
      case getType(postsActions.fetchComments.request):
        postId = action.payload.forId;
        newState = state.map((item: Post) => {
          return item.id !== postId
            ? item
            : Object.assign({}, item, {commentsReady: false});
        });
        return newState;
      case getType(postsActions.fetchComments.success):
        const comments = action.payload.data.comments as Comment[];
        newState = state.map((item: Post) => {
          return item.id !== action.payload.data.postid
            ? item
            : Object.assign({}, item, {comments: item.comments ? item.comments.concat(comments) : comments, commentsReady: true});
        });
        return newState;
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
  },
});
