// epics.ts
import { fetchPosts, fetchComments } from './actions';
import { Epic } from 'redux-observable';
import { RootAction } from 'src/app/store/root-action';
import { RootState } from 'src/app/store/root-reducer';
import { of, pipe, from } from 'rxjs/index';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { postsApi, commentsApi } from '../../api';

export const fetchPostsFlow: Epic<RootAction, any, RootState> = (action$, state) => {
  return action$.pipe(
    filter(isActionOf(fetchPosts.request)),
    switchMap(action =>
      from(postsApi.getPosts(action.payload.amount, action.payload.fromId, action.payload.toId)).pipe(
        map(fetchPosts.success),
        catchError(pipe(fetchPosts.failure, of))
      )
    )
  );
};

export const fetchCommentsFlow: Epic<RootAction, any, RootState> = (action$, state) => {
  return action$.pipe(
    filter(isActionOf(fetchComments.request)),
    switchMap(action =>
      from(commentsApi.getComments(action.payload.amount, action.payload.forId, action.payload.fromId)).pipe(
        map(fetchComments.success),
        catchError(pipe(fetchPosts.failure, of))
      )
    )
  );
};
