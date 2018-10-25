// epics.ts
import { fetchPosts, fetchComments } from './actions';
import { Epic } from 'redux-observable';
import { RootAction } from 'src/app/store/root-action';
import { RootState } from 'src/app/store/root-reducer';
import { of, pipe, from } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { postsApi, commentsApi } from '../../../api';

export const fetchPostsFlow: Epic<RootAction, any, RootState> = (action$, state) => {
  debugger;
  return action$.pipe(
    filter(isActionOf(fetchPosts.request)),
    switchMap(action =>
      from(postsApi.getPosts()).pipe(
        map(fetchPosts.success),
        catchError(pipe(fetchPosts.failure, of))
      )
    )
  )
}

export const fetchCommentsFlow: Epic<RootAction, any, RootState> = (action$, state) => {
  debugger;
  return action$.pipe(
    filter(isActionOf(fetchComments.request)),
    switchMap(action =>
      from(commentsApi.getComments(1,2)).pipe(
        map(fetchComments.success),
        catchError(pipe(fetchPosts.failure, of))
      )
    )
  )
}
